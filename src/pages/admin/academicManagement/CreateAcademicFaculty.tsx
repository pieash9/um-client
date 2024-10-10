import { Button, Col, Flex } from "antd";
import UFrom from "../../../components/form/UFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import USelect from "../../../components/form/USelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty, TResponse } from "../../../types";
import { toast } from "sonner";

const facultyOptions = [
  {
    label: "Faculty of Science and Information Technology",
    value: "Faculty of Science and Information Technology",
  },
  {
    label: "Faculty of Engineering",
    value: "Faculty of Engineering",
  },
  {
    label: "Faculty of Business Administration",
    value: "Faculty of Business Administration",
  },
  {
    label: "Faculty of Law",
    value: "Faculty of Law",
  },
];

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic faculty...");
    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic faculty created successfully", {
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
        <UFrom
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <USelect options={facultyOptions} label="Name" name="name" />
          <Button htmlType="submit">Submit</Button>
        </UFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
