'use client';

import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Rootlayout({ children }: LayoutProps<'/'>) {
  const { token, objectId } = useAuthStore();
  const { setAuth } = useAuthStore();

  useQuery({
    queryFn: async () => {
      const res = await axios.get(
        `https://api.backendless.com/51BDC217-6F0F-4668-8A87-71B5CFFCD59A/EC698C6A-021C-4A86-8DAD-32A425C360DD/data/Users/${objectId}`,
        {
          headers: {
            'user-token': token,
          },
        },
      );
      setAuth(res?.data?.email, res?.data?.username, token, res?.data?.objectId);
      return res.data;
    },
    queryKey: ['session-user', token, objectId],
    enabled: !!token && !!objectId,
    retry: false,
  });
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle inline"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <div className="p-4">{children}</div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
}
