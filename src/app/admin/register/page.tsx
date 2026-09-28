'use client';

import { toast } from 'react-toastify';
import { MdMenuBook } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import {
  loginSchema,
  type LoginRequest,
} from '@/feature/validation/loginValid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { RegisterApi } from '@/Api/registerApi/RegisterApi';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async () => {
      const { email, password } = getValues();
      await RegisterApi({ email, password });
    },
    onSuccess: (res) => {
      toast.success('Register berhasil! Silahkan masukkan akun ke form Login');
      reset();
    },
    onError: (res) => {
      toast.error('Register Gagal');
    },
  });

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div>
          <div className="mb-4 flex justify-center text-6xl">
            <MdMenuBook className="p-2 bg-blue-700 rounded-lg" />
          </div>
          <div className="flex justify-center">
            <h1 className="text-blue-700 text-3xl font-bold">RuangBaca Desk</h1>
          </div>
          <div>
            <p className="mb-7 flex justify-center font-semibold text-lg">
              Library Management
            </p>
          </div>
          <form onSubmit={handleSubmit(() => loginMutation())}>
            <div className="aura aura-rainbow p-5 w-fit h-fit bg-white text-black rounded-2xl">
              <h1 className="text-xl font-bold">Administrative Register</h1>
              <p className="text-sm">Please input a new Email & password</p>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">
                  Email Address
                </legend>
                <input
                  type="email"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('email')}
                />
                <p className="label text-red-500">{errors?.email?.message}</p>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-black">Password</legend>
                <input
                  type="password"
                  className="input w-full bg-gray-300"
                  placeholder="Type here"
                  {...register('password')}
                />
                <p className="label text-red-500">
                  {errors?.password?.message}
                </p>
              </fieldset>
              <label className="mt-3 label">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox bg-yellow-400"
                />
                <p className="text-sm">Remember me</p>
              </label>
              <button
                disabled={isPending}
                className="w-full mt-4 btn btn-primary"
              >
                Register
              </button>
              <div className="flex justify-center">
                <p className="mt-3 text-sm">
                  Already have an account?{' '}
                  <a href="login" className="text-blue-700 underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
