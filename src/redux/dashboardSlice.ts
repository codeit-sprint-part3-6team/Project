// dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dashboard, DashboardState } from '@/type/dashboard';

const initialState: DashboardState = {
  sidebarDashboards: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSidebarDashboards(state, action: PayloadAction<Dashboard[]>) {
      state.sidebarDashboards = action.payload; // 사이드바 대시보드 업데이트
    },
  },
});

export const { setSidebarDashboards } = dashboardSlice.actions;
export default dashboardSlice.reducer;
