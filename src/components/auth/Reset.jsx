import React from "react";
import ResetForm from "../form/ResetForm";

function Reset() {
  return (
    <div className="flex gap-6 flex-col items-center justify-center min-h-screen px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-110 justify-center">
        <div className="flex items-center justify-center text-[20px] mb-5 text-[#037F69]">
          Reset
        </div>
        <ResetForm />
      </div>
    </div>
  );
}

export default Reset;
