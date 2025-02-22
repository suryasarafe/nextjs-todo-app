import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "you see the Todo App home screen, you need to login or register to continue."
}

export default async function HomePage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return <section>
    <div className="h-40 p-10 text-center">
      <h1 className="font-bold text-2xl">You see the Todo App Home screen</h1>
      <p>you need to login or register to continue</p>
    </div>
  </section>
}
