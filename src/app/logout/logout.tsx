"use client";


const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export default function LogoutComponent() {
  return <section>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Logout</h2>
        <div className="text-center">
          <p className="mb-10">are you sure want to logout?</p>

          <button className="bg-blue-600 text-white px-6 py-1 rounded-lg text-lg shadow hover:bg-blue-700 transition" onClick={handleLogout}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  </section>
}
