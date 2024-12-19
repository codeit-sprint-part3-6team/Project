export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardState {
  sidebarDashboards: Dashboard[];
}

export interface Invitaion {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
