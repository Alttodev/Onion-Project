import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../forminputs/TextInput";
import { schema } from "@/lib/validation";
import { Button } from "../ui/button";
import NumberInput from "../forminputs/NumberInput";
import SelectInput from "../forminputs/SelectInput";
import DatePicker from "../forminputs/DatePicker";
import { toastError, toastSuccess } from "@/lib/toast";
import { useZustandPopup } from "@/hooks/zustand";
import { useCustomerCreate } from "@/hooks/customerhook";

const options = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

const CustomerForm = () => {
  const { closeModal } = useZustandPopup();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      unit: "",
      amount: "",
      received: "",
      balance: "",
      status: "",
      date: "",
    },
  });

  const { mutateAsync:customerCreate, isLoading:LoadingCreate } =useCustomerCreate()
  
  const onSubmit = async (data) => {
    try {
    const res = await customerCreate(data)
      console.log(data, "data");
      closeModal();
      toastSuccess(res?.message);
    } catch (error) {
      console.log(error);
       toastError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label>Name</label>
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
        <label>Unit (kg)</label>
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
        <label>Amount</label>
        <NumberInput
          name="amount"
          control={control}
          placeholder="Amount"
          disabled={isSubmitting}
        />
        {errors.amount?.message && (
          <p className="text-red-500 text-sm">{errors.amount?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <label>Received Amount</label>
        <NumberInput
          name="received"
          control={control}
          placeholder="Received Amount"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <label>Balance Amount</label>
        <NumberInput
          name="balance"
          control={control}
          placeholder="Balance Amount"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label>Date</label>
        <DatePicker
          name="date"
          label="Date"
          control={control}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <label>Status</label>
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
          Create
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
