import React, { Fragment, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import SelectInput from "../forminputs/SelectInput";
import DatePicker from "../forminputs/DatePicker";
import { toastError, toastSuccess } from "@/lib/toast";
import { useZustandPopup } from "@/hooks/zustand";
import {
  useCustomerName,
  useCustomerOrderCreate,
  useCustomerOrderInfo,
  useCustomerOrderUpdate,
} from "@/hooks/customerhook";
import AmountInput from "../forminputs/AmountInput";
import NumberInput from "../forminputs/NumberInput";
import { Loader2Icon } from "lucide-react";
import FormSkeleton from "../skeleton/FormSkeleton";
import CustomerSelect from "../forminputs/CustomerSelect";

const options = [
  { label: "Ordered", value: "ordered" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

const CustomerOrderCreate = () => {
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
    resolver: zodResolver(orderSchema),
    defaultValues: {
      username: "",
      unit: "",
      amount: "",
      received: "",
      balance: "",
      status: "",
      createdDate: "",
      updatedDate: "",
    },
  });

  const { mutateAsync: customerCreate, isLoading: LoadingCreate } =
    useCustomerOrderCreate();
  const { mutateAsync: customerUpdate, isLoading: LoadingUpdate } =
    useCustomerOrderUpdate();

  const { data: customerInfo, isFetching } = useCustomerOrderInfo(id);
  const data = useMemo(() => customerInfo?.data, [customerInfo]);

  const { data: users } = useCustomerName("username");

  const loading = id ? LoadingUpdate : LoadingCreate;
  const customerId = watch("username");
  const user = users?.data?.find((item) => item._id === customerId);
  console.log(user, "user");

  const onSubmit = async (value) => {
    const formData = {
      ...value,
      customerId: customerId,
      username: user?.username,
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

      if (bal === 0) {
        setValue("balance", "0");
      }
    }
  }, [amount, received, setValue]);

  useEffect(() => {
    if (data) {
      setValue("username", data?.customerId || "");
      setValue("unit", data?.unit != null ? String(data.unit) : "");
      setValue("amount", data?.amount != null ? String(data.amount) : "");
      setValue("received", data?.received != null ? String(data.received) : "");
      setValue("balance", data?.balance != null ? String(data.balance) : "");
      setValue("status", data?.status || "");
      setValue("createdDate", data?.createdDate || undefined);
      setValue("updatedDate", data?.updatedDate || undefined);
    }
  }, [id, data, setValue]);

  if (isFetching) {
    return <FormSkeleton />;
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[15px]">Customer</label>
          <CustomerSelect
            name="username"
            control={control}
            defaultValue={data?.customerId}
            options={users}
            placeholder="Select Customer"
            disabled={isSubmitting || id}
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

        <div className="flex flex-col gap-1 mt-1">
          <label className="text-[15px]">Balance Amount</label>
          <AmountInput
            name="balance"
            control={control}
            disabled={isSubmitting}
          />
        </div>

        {id ? (
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-[15px]">Completed Date</label>
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
          <div className="flex flex-col gap-1 mt-2">
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

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[15px]">Status</label>
          <SelectInput
            name="status"
            control={control}
            options={options}
            defaultValue={data?.status}
            placeholder="Status"
            disabled={isSubmitting}
            balance={watch("balance")}
          />
          {errors.status?.message && (
            <p className="text-red-500 text-sm">{errors.status?.message}</p>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-600 text-white cursor-pointer"
          >
            {id ? "Update" : "Create"}
            {loading && <Loader2Icon className="ml-2 animate-spin" />}
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default CustomerOrderCreate;
