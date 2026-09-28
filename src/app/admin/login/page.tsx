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
import { LoginApi } from '@/Api/loginApi/LoginApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

interface LoginResponse {
  objectId: string;
  email: string;
  username: string;
  'user-token': string;
}

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
  const { setAuth } = useAuthStore();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async () => {
      const { email, password } = getValues();
      return await LoginApi({ email, password });
    },
    onSuccess: (res) => {
      console.log(res);
      toast.success('Login berhasil!');
      const data = res.data as LoginResponse;
      setAuth(data.email, data.username, data['user-token'], data.objectId);
      router.push('/admin');
    },
    onError: (res) => {
      toast.error('Login Gagal');
      reset();
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
              <h1 className="text-xl font-bold">Administrative Login</h1>
              <p className="text-sm">
                Please enter your credentials to access the catalog
              </p>
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
                Login
              </button>
              <div className="flex justify-center">
                <p className="mt-3 text-sm">
                  Need administrative access?{' '}
                  <a href="register" className="text-blue-700 underline">
                    Request Account
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
