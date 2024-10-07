import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UFrom from "../components/form/UFrom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "0001",
      password: "admin12345",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading("Logging in...");
    // try {
    //   const userInfo = { id: data.id, password: data.password };
    //   const res = await login(userInfo).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
    //   toast.success("Login successful", { id: toastId, duration: 2000 });
    //   navigate(`/${user.role}/dashboard`);
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (err) {
    //   toast.error("Something went wrong", { id: toastId, duration: 2000 });
    // }
  };
  return (
    <UFrom onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div className="">
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </UFrom>
  );
};

export default Login;
