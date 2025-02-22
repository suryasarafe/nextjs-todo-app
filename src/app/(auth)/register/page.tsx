import { Metadata } from "next";
import RegisterContainer from "./container";

export const metadata: Metadata = {
  title: "Register",
  description: "Register Todo App, Before continue you can register here"
}

export default function RegisterPage() {
  return (
    <RegisterContainer />
  );
}
