import { Row, Button } from "antd";
import UFrom from "../components/form/UFrom";
import UInput from "../components/form/UInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../types";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing password...");

    try {
      const res = (await changePassword(data)) as TResponse<any>;
      if (res.data.success) {
        dispatch(logout());
        navigate("/login", { replace: true });
      }
      toast.success("Password changed successfully", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UFrom onSubmit={onSubmit}>
        <UInput type="text" name="oldPassword" label="Old Password:" />
        <UInput type="text" name="newPassword" label="New Password:" />

        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </UFrom>
    </Row>
  );
};

export default ChangePassword;
