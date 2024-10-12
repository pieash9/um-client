import { FieldValues, SubmitHandler } from "react-hook-form";
import UFrom from "../../../components/form/UFrom";
import { Button, Col, Flex } from "antd";
import USelect from "../../../components/form/USelect";
import { toast } from "sonner";
import UInput from "../../../components/form/UInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating course...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course created successfully", {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UFrom onSubmit={onSubmit}>
          <UInput type="text" name="title" label="Title" />
          <UInput type="text" name="prefix" label="Prefix" />
          <UInput type="text" name="code" label="Code" />
          <UInput type="text" name="credits" label="Credits" />
          <USelect
            mode="multiple"
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </UFrom>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
