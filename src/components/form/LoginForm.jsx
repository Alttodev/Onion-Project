import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import TextInput from "../forminputs/TextInput";
import { PasswordInput } from "../forminputs/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "@/lib/toast";
import { useUserLogin } from "@/hooks/customerhook";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: userLogin, isLoading: LoadingCreate } = useUserLogin();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await userLogin(data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      toastSuccess(res?.message);
      navigate("/home");
    } catch (error) {
      toastError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label className="text-[15px]">Email</label>
        <TextInput
          name="email"
          control={control}
          placeholder="Email"
          disabled={isSubmitting}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <label className="text-[15px]">Password</label>
        <PasswordInput
          name="password"
          control={control}
          placeholder="Password"
          disabled={isSubmitting}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col">
          <div className="text-sm text-gray-600">
            Don't have an account ? &nbsp;
            <Link to="/signin" className="text-blue-500">
              Sign up
            </Link>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <Link to="/reset" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-600 text-white cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
