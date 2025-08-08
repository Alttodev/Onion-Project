import React, { Fragment, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../forminputs/TextInput";
import { schema } from "@/lib/validation";
import { Button } from "../ui/button";
import SelectInput from "../forminputs/SelectInput";
import DatePicker from "../forminputs/DatePicker";
import { toastError, toastSuccess } from "@/lib/toast";
import { useZustandPopup } from "@/hooks/zustand";
import { useCustomerCreate, useCustomerInfo } from "@/hooks/customerhook";
import { FormSkeleton } from "../skeleton/Formskeleton";
import AmountInput from "../forminputs/AmountInput";
import NumberInput from "../forminputs/NumberInput";

const options = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

const CustomerForm = () => {
  const { closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : null;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      unit: "",
      amount: "",
      received: "",
      balance: "",
      date: "",
      status: "",
    },
  });

  const { mutateAsync: customerCreate, isLoading: LoadingCreate } =
    useCustomerCreate();
  const { data: customerInfo, isLoading: Loading } = useCustomerInfo(id);
  const data = useMemo(() => customerInfo?.data, [customerInfo]);

  const onSubmit = async (data) => {
    try {
      const res = await customerCreate(data);
      closeModal();
      toastSuccess(res?.message);
    } catch (error) {
      toastError(error?.response?.data?.message || "Something went wrong");
    }
  };



  useEffect(() => {
    if (data) {
      setValue("username", data?.username);
      setValue("unit", data?.unit);
      setValue("amount", data?.amount);
      setValue("received", data?.received);
      setValue("balance", data?.balance);
      setValue("status", data?.status);
      setValue("date", data?.date);
    }
  }, [data, setValue]);

  if (Loading) {
    return <FormSkeleton />;
  }

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
          <label className="text-[15px]">Unit (kg)</label>
          <NumberInput
            name="unit"
            control={control}
            placeholder="Unit"
            disabled={isSubmitting}
          />
          {errors.unit?.message && (
            <p className="text-red-500 text-sm">{errors.unit?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Total Amount</label>
          <AmountInput
            name="amount"
            control={control}
            disabled={isSubmitting}
          />
          {errors.amount?.message && (
            <p className="text-red-500 text-sm">{errors.amount?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Received Amount</label>
          <AmountInput
            name="received"
            control={control}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Balance Amount</label>
          <AmountInput
            name="balance"
            control={control}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Date</label>
          <DatePicker
            name="date"
            label="Date"
            control={control}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Status</label>
          <SelectInput
            name="status"
            control={control}
            options={options}
            placeholder="Status"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#037F69] hover:bg-[#037F69] text-white cursor-pointer"
          >
            {id ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default CustomerForm;
