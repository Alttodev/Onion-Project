import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import TextInput from "../forminputs/TextInput";
import { PasswordInput } from "../forminputs/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../lib/validation";
import { toastError, toastSuccess } from "../../lib/toast";
import { useUserSignup } from "../../hooks/customerhook";

const SigninForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: userCreate, isLoading: LoadingCreate } = useUserSignup();
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
      const res = await userCreate(data);
      toastSuccess(res?.message);
      navigate("/");
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
        <div className="text-sm text-gray-600">
          Back to &nbsp;
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-600 text-white cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sigining up..." : "Sign up"}
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
