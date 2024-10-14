import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

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
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const USelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode = undefined,
  onValueChange,
}: USelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
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

export default USelectWithWatch;
