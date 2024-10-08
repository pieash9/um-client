import { FieldValues, SubmitHandler } from "react-hook-form";
import UFrom from "../../../components/form/UFrom";
import UInput from "../../../components/form/UInput";
import { Button } from "antd";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <UFrom onSubmit={onSubmit}>
      <UInput type="text" name="name" label={"Name:"} />
      <Button htmlType="submit">Submit</Button>
    </UFrom>
  );
};

export default CreateAcademicSemester;
