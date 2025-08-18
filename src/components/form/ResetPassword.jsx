import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { toastError, toastSuccess } from "@/lib/toast";
import { PasswordInput } from "../forminputs/PasswordInput";
import { resetPasswordSchema } from "@/lib/validation";
import { useUserResetPassword } from "@/hooks/customerhook";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const { mutateAsync: userReset } = useUserResetPassword();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await userReset({
        id,
        token,
        password: data.password,
      });
      toastSuccess(res?.message);
      navigate("/");
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
      <div className="flex justify-end mt-6">
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
