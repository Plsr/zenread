"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { navigate, verifyOtp } from "@/actions";

type OtpFormProps = {
  email: string;
};

export const OtpForm = ({ email }: OtpFormProps) => {
  const [otpInput, setOptInput] = useState("");

  const handleSubmit = async () => {
    const res = await verifyOtp(email, otpInput);

    // TODO: Better handling
    if (res.status === "error") {
      console.error(res.message);
      navigate("/login");
      return;
    }

    navigate("/channel");
  };

  return (
    <div>
      <Input
        placeholder="OTP"
        onChange={(e) => setOptInput(e.target.value)}
        value={otpInput}
      />
      <Button onClick={handleSubmit} disabled={!otpInput}>
        Submit
      </Button>
    </div>
  );
};
