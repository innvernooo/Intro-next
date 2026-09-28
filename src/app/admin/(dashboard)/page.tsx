"use client";

import { useEmailStore } from '@/stores/useEmailStore';
import { useRef } from 'react';

export default function AdminDashboard() {
  const { setEmail, setEmail2 } = useEmailStore();
  const inputEmail = useRef<HTMLInputElement>(null);

  const handleInputEmail = () => {
    setEmail2(inputEmail?.current!.value);
  };

  return (
    <>
      <h1 className="font-semibold">Input your Email below!</h1>
      <input
        type="email"
        placeholder="type here..."
        className="bg-white rounded-lg text-black p-1 mt-2"
        ref={inputEmail}
      />
      <button onClick={handleInputEmail} className="btn btn-success ml-2">
        Input
      </button>
    </>
  );
}
