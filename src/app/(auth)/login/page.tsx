import { Metadata } from "next";
import LoginContainer from "./container";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Todo App, You can input your credential here to login and continue using Todo App"
}

export default function LoginPage() {
  return (
    <LoginContainer />
  );
}
