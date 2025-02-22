import { Metadata } from "next";
import LogoutComponent from "./logout";

export const metadata: Metadata = {
  title: "Logout",
  description: "you see the Todo App home screen, you need to login or register to continue."
}

export default async function HomePage() {
  return (<LogoutComponent />);
}
