import React, { Fragment, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../forminputs/TextInput";
import { customerSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import DatePicker from "../forminputs/DatePicker";
import { toastError, toastSuccess } from "@/lib/toast";
import { useZustandPopup } from "@/hooks/zustand";
import {
  useCustomerCreate,
  useCustomerInfo,
  useCustomerUpdate,
} from "@/hooks/customerhook";
import { Loader2Icon } from "lucide-react";
import PhoneNumberInput from "../forminputs/PhoneInput";

const CustomerCreateForm = () => {
  const { closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : null;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      username: "",
      date: "",
      address: "",
      phone: "",
    },
  });

  const { mutateAsync: customerCreate, isLoading: LoadingCreate } =
    useCustomerCreate();
  const { mutateAsync: customerUpdate, isLoading: LoadingUpdate } =
    useCustomerUpdate();

  const { data: customerInfo } = useCustomerInfo(id);
  const data = useMemo(() => customerInfo?.data, [customerInfo]);

  const loading = id ? LoadingUpdate : LoadingCreate;

  const onSubmit = async (formData) => {
    console.log(formData, "formData");
    try {
      let res;
      if (id) {
        res = await customerUpdate({ id, formData });
      } else {
        res = await customerCreate(formData);
      }
      toastSuccess(res?.message);
      reset();
      closeModal();
    } catch (error) {
      toastError(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (data) {
      setValue("username", data?.username || "");
      setValue("date", data?.date || undefined);
    }
  }, [id, data, setValue]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-[15px]">Name</label>
          <TextInput
            name="username"
            control={control}
            placeholder="UserName"
            disabled={isSubmitting}
          />
          {errors.username?.message && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Date</label>
          <DatePicker
            name="date"
            label="Date"
            control={control}
            disabled={isSubmitting}
          />
          {errors.date?.message && (
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Address</label>
          <TextInput
            name="address"
            control={control}
            placeholder="Address"
            disabled={isSubmitting}
          />
          {errors.address?.message && (
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Phone</label>
          <PhoneNumberInput
            name="phone"
            control={control}
            placeholder="Phone"
            disabled={isSubmitting}
          />
          {errors.phone?.message && (
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#037F69] hover:bg-[#037F69] text-white cursor-pointer"
          >
            {id ? "Update" : "Create"}
            {loading && <Loader2Icon className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default CustomerCreateForm;
