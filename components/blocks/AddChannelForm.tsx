"use client";

import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { addChannel } from "@/actions";

export const AddChannelForm = () => {
  const [state, formAction] = useFormState(addChannel, {
    status: "",
    message: "",
  });

  if (state.status === "success") {
    return <p>Channel added!</p>;
  }

  return (
    <form action={formAction}>
      {state.message}
      <Input required type="text" placeholder="Channel URL" name="feedUrl" />
      <Button>Add Channel</Button>
    </form>
  );
};
