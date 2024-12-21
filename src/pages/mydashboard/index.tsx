import React from 'react';
import Sidebar from '@/components/common/sidebar/Sidebar';
import InvitationList from '@/components/product/mydashboard/InvitationList';
import DashboardList from '@/components/product/mydashboard/DashboardList';
import Navbar from '@/components/common/navbar/Navbar';

export default function MyDashboard() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <DashboardList />
      <InvitationList />
    </div>
  );
}
