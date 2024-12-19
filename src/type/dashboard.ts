export interface GetDashboardsParams {
  cursorId?: number;
  page: number;
  size: number;
  navigationMethod: 'infiniteScroll' | 'pagination';
}

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

export interface GetDashboardsResponse {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
}

export interface GetInvitationsParams {
  size: number;
  cursorId: number;
  title?: string;
}

export interface GetInvitationsResponse {
  cursorId: number;
  invitations: Invitaion[];
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

export interface PostDashboardsParams {
  title: string;
  color: string;
}

export interface PostDashboardsResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface PutInvitationsParams {
  invitationId: number;
  inviteAccepted: boolean;
}

export interface PutInvitationsResponse {
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
