import Link from "next/link";

export default function NeedLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-4">Unauthorized</h1>
        <h2 className="text-xl font-bold text-center mb-4">Please login to continue</h2>

        <p className="text-black mt-4 px-14">
          You need to login before continue using this app 
        </p>
        <div className="m-4 mt-16 text-center">
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition">
              go to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}