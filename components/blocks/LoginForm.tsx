"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { navigate, sendOtp } from "@/actions";

export const LoginForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = emailInput.match(/.+\@.+\..+/);

  const handleSubmit = async () => {
    const res = await sendOtp(emailInput);

    if (res.status === "error") {
      setError(res.message!);
      return;
    }

    navigate("/verify-otp");
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <Input
        placeholder="Email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={!isValidEmail}>
        Get OTP
      </Button>
    </div>
  );
};
