"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserAvatar({ user }: { user: { id: string, name: string, avatar: string, role: string } }) {
  const [showInfo, setShowInfo] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
      >

        {imageError ? (
          <div className="text-2xl bg-white object-cover">👤</div>
        ) : (
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </button>

      {/* Hover User Info */}
      {showInfo && (
        <div className="absolute left-1/2 -translate-x-1/2 top-35 bg-white shadow-lg rounded-lg p-3 w-48 z-50 text-center">
          {/* <h4 className="font-semibold text-gray-700">{user.name}</h4>
          <p className="text-gray-600 lowercase">{user.role}</p>

          <hr className="my-3"/> */}
          <p className="text-gray-600 hover:underline">
            <Link href={'/logout'}>
              Logout
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
