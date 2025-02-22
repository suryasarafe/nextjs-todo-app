import Link from "next/link";
import UserAvatar from "./user-avatar";

export default function HeaderComponent() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/home" className="mr-4">
          <h1 className="text-xl font-bold">To-Do App</h1>
        </Link>
        <nav className="flex items-center">

          <Link href="/home" className="h-8 mr-4 hover:underline">
            Tasks
          </Link>

          <UserAvatar user={{ id: '1123', name: 'asep', avatar: 'https://i.pravatar.cc/50?u=21', role: 'LEAD' }} />
        </nav>
      </div>
    </header>
  );
}
