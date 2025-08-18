import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "@/lib/toast";
import { useUserReset } from "@/hooks/customerhook";
import { PasswordInput } from "../forminputs/PasswordInput";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: userReset, isLoading: LoadingCreate } = useUserReset();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await userReset(data);
      navigate("/");
      toastSuccess(res?.message);
    } catch (error) {
      toastError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 mt-4">
        <label className="text-[15px]">New Password</label>
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
          <Link to="/" className="text-blue-500">
            Reset Password
          </Link>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-600 text-white cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
