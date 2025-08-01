import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import TextInput from "../forminputs/TextInput";
import { PasswordInput } from "../forminputs/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess } from "@/lib/toast";

const LoginForm = () => {
  const navigate = useNavigate();
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
      console.log(data, "data");
      navigate("/home");
      toastSuccess("Login successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label>Email</label>
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
        <label>Password</label>
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
              Signin
            </Link>
          </div>
          <div className="text-sm text-gray-600 mt-1">
          <Link to="/reset" className="text-blue-500">
            Forgot Password?
            </Link>
            </div>
        </div>
        <Button
          className="bg-[#037F69] hover:bg-[#037F69] text-white cursor-pointer"
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
