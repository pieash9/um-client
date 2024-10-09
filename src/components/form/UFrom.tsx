import { Form } from "antd";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
} & TFromConfig;

const UFrom = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
  const formConfig: TFromConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default UFrom;
