import { useForm } from "react-hook-form";

const UFrom = ({ onSubmit, children }) => {
  const { handleSubmit } = useForm();

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default UFrom;
