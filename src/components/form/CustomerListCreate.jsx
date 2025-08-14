import React, { Fragment, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/validation";
import { Button } from "../ui/button";
import SelectInput from "../forminputs/SelectInput";
import DatePicker from "../forminputs/DatePicker";
import { toastError, toastSuccess } from "@/lib/toast";
import { useZustandPopup } from "@/hooks/zustand";
import {
  useCustomerCreate,
  useCustomerInfo,
  useCustomerUpdate,
} from "@/hooks/customerhook";
import AmountInput from "../forminputs/AmountInput";
import NumberInput from "../forminputs/NumberInput";
import { Loader2Icon } from "lucide-react";

const options = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

const CustomerListForm = () => {
  const { closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : "67567";

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      unit: "",
      amount: "",
      received: "",
      balance: "",
      createdDate: "",
      updatedDate: "",
      status: "",
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

  const amount = watch("amount");
  const received = watch("received");

  useEffect(() => {
    if (received && received !== "0") {
      const amt = parseFloat(amount) || 0;
      const rec = parseFloat(received) || 0;
      const bal = amt - rec;
      setValue("balance", bal.toString());
    } else {
      setValue("balance", "");
    }
  }, [amount, received, setValue]);

  useEffect(() => {
    if (data) {
      setValue("username", data?.username || "");
      setValue("unit", data?.unit != null ? String(data.unit) : "");
      setValue("amount", data?.amount != null ? String(data.amount) : "");
      setValue("received", data?.received != null ? String(data.received) : "");
      setValue("balance", data?.balance != null ? String(data.balance) : "");
      setValue("status", data?.status || "");
      setValue("date", data?.date || undefined);
    }
  }, [id, data, setValue]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mt-1">
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

        <div className="flex flex-col gap-1 mt-1">
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

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[15px]">Received Amount</label>
          <AmountInput
            name="received"
            control={control}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[15px]">Balance Amount</label>
          <AmountInput
            name="balance"
            control={control}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[15px]">Created Date</label>
          <DatePicker
            name={`${id}?:"updatedDate":"createdDate"`}
            label="Date"
            control={control}
            disabled={isSubmitting}
          />
          {errors[id ? "updatedDate" : "createdDate"]?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors[id ? "updatedDate" : "createdDate"]?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[15px]">Status</label>
          <SelectInput
            name="status"
            control={control}
            options={options}
            defaultValue={data?.status}
            placeholder="Status"
            disabled={isSubmitting}
          />
          {errors.status?.message && (
            <p className="text-red-500 text-sm">{errors.status?.message}</p>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-600 text-white cursor-pointer"
          >
            {id ? "Update" : "Create"}
            {loading && <Loader2Icon className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default CustomerListForm;
