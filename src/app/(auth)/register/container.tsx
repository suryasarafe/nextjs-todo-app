"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterContainer() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER"); // Default role
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem("user");
      if (!user) {
        setError("Unauthorized. Please login.");
        return;
      }
      const parsed = JSON.parse(user);
      setToken(parsed.token);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ username, password, role }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.error || "Registration failed");
      return;
    }

    router.push("/login"); // Redirect to login page after success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="MEMBER">Member</option>
              <option value="LEAD">Lead</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}
