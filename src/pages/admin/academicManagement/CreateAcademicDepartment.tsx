import { FieldValues, SubmitHandler } from "react-hook-form";
import UFrom from "../../../components/form/UFrom";
import { Button, Col, Flex } from "antd";
import USelect from "../../../components/form/USelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicDepartment } from "../../../types";
import UInput from "../../../components/form/UInput";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFaculties } = useGetAcademicFacultiesQuery(undefined);

  const facultyOptions = academicFaculties?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic department...");
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    console.log(data);
    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic department created successfully", {
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
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <UInput type="text" label="Name" name="name" />

          <USelect
            options={facultyOptions!}
            label="Faculty name"
            name="academicFaculty"
          />
          <Button htmlType="submit">Submit</Button>
        </UFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
