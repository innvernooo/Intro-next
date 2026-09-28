'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { useEmailStore } from '@/stores/useEmailStore';

export default function Navbar() {
  const { email, username } = useAuthStore();
  // const localStorageEmail = localStorage.getItem('email');
  // const localStorageUsername = localStorage.getItem('username');

  return (
    <>
      <nav className="navbar w-full bg-base-300">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost drawer-button"
        >
          {/* Sidebar toggle icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        <div className="w-full flex items-center justify-between">
          <div className="px-4 font-bold">ADMIN DASHBOARD</div>
          <div className="flex gap-3 items-center">
            <h3>
              {email} / {username}
            </h3>
            <div className="avatar w-10 h-10">
              <div className="w-24 rounded-full">
                <img
                  alt="Tailwind-CSS-Avatar-component"
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
