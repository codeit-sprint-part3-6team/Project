import React from 'react';
import Sidebar from '@/components/common/sidebar/Sidebar';
import InvitationList from '@/components/product/mydashboard/InvitationList';
import DashboardList from '@/components/product/mydashboard/DashboardList';

export default function MyDashboard() {
  return (
    <div>
      <Sidebar />
      <DashboardList />
      <InvitationList />
    </div>
  );
}
