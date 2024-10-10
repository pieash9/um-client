import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type USelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  options:
    | {
        label: string;
        value: string;
        disabled?: boolean;
      }[]
    | undefined;
};

const USelect = ({ label, name, options, disabled }: USelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            size="large"
            {...field}
            style={{ width: "100%" }}
            options={options}
            placeholder="Select an option"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default USelect;
