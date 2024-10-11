import { FieldValues, SubmitHandler } from "react-hook-form";
import UFrom from "../../../components/form/UFrom";
import { Button, Col, Flex } from "antd";
import USelect from "../../../components/form/USelect";
import { semesterStatusOptions } from "../../../constants/sesemster";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import UDatePicker from "../../../components/form/UDatePicker";
import UInput from "../../../components/form/UInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: item.name + " - " + item.year,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating academic semester...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic semester created successfully", {
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
          <USelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <USelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <UDatePicker name="startDate" label="Start Date" />
          <UDatePicker name="endDate" label="End Date" />
          <UInput type="text" name="minCredit" label="Min Credit" />
          <UInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </UFrom>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
