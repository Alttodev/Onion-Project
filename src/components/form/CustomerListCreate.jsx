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
  useCustomerListCreate,
  useCustomerListInfo,
  useCustomerListUpdate,
} from "@/hooks/customerhook";
import AmountInput from "../forminputs/AmountInput";
import NumberInput from "../forminputs/NumberInput";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router-dom";

const options = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

const CustomerListForm = () => {
  const { closeModal, modalData } = useZustandPopup();
  const id = typeof modalData === "string" ? modalData : null;

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

  const params = useParams();
  const customerId = params?.id;

  const { mutateAsync: customerCreate, isLoading: LoadingCreate } =
    useCustomerListCreate();
  const { mutateAsync: customerUpdate, isLoading: LoadingUpdate } =
    useCustomerListUpdate();

  const { data: customerInfo } = useCustomerListInfo(id);
  const data = useMemo(() => customerInfo?.data, [customerInfo]);

  const loading = id ? LoadingUpdate : LoadingCreate;

  const onSubmit = async (value) => {
    const formData = {
      ...value,
      customerId: customerId,
    };
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
      setValue("unit", data?.unit != null ? String(data.unit) : "");
      setValue("amount", data?.amount != null ? String(data.amount) : "");
      setValue("received", data?.received != null ? String(data.received) : "");
      setValue("balance", data?.balance != null ? String(data.balance) : "");
      setValue("status", data?.status || "");
      setValue("createdDate", data?.createdDate || undefined);
      setValue("updatedDate", data?.updatedDate || undefined);
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

        {id ? (
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-[15px]">Updated Date</label>
            <DatePicker
              name="updatedDate"
              label="Date"
              control={control}
              disabled={isSubmitting}
            />
            {errors?.updatedDate?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.updatedDate?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1 mt-1">
            <label className="text-[15px]">Purchased Date</label>
            <DatePicker
              name="createdDate"
              label="Date"
              control={control}
              disabled={isSubmitting}
            />
            {errors?.createdDate?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.createdDate?.message}
              </p>
            )}
          </div>
        )}

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
