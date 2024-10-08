import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type USelectProps = {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
};

const USelect = ({ label, name, options }: USelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            size="large"
            {...field}
            style={{ width: "100%" }}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default USelect;
