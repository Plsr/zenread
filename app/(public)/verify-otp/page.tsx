import { cookies } from "next/headers";
import { OtpForm } from "@/components/blocks/OtpForm";
import Link from "next/link";

const VerifyOtpPage = () => {
  const emailCookie = cookies().get("zenread.otp.email");

  // TODO: Better handling of this edge case
  if (!emailCookie || !emailCookie.value) {
    return (
      <div>
        <h1>Invalid request</h1>
        <Link href="/login">Go back to login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Verify OTP Page</h1>
      <OtpForm email={emailCookie.value} />
    </div>
  );
};

export default VerifyOtpPage;
