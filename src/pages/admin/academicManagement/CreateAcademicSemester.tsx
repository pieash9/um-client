import { FieldValues, SubmitHandler } from "react-hook-form";
import UFrom from "../../../components/form/UFrom";
import { Button, Col, Flex } from "antd";
import USelect from "../../../components/form/USelect";
import { semesterOptions } from "../../../constants/sesemster";
import { monthOptions } from "../../../constants/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: (currentYear + number).toString(),
  label: (currentYear + number).toString(),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="middle">
      <Col span={6}>
        <UFrom onSubmit={onSubmit}>
          <USelect options={semesterOptions} label="Name" name="name" />
          <USelect options={yearOptions} label="Year" name="year" />
          <USelect options={monthOptions} label="Name" name="startMonth" />
          <USelect options={monthOptions} label="Name" name="endMonth" />
          <Button htmlType="submit">Submit</Button>
        </UFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
