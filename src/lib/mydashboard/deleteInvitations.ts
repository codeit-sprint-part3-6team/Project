import instance from '../instance';
import { DashboardInvitations } from 'src/types/dashboardTypes';

const deleteDashboardInvitation = async (
  dashboardId: string | undefined,
  invitationId: number
) => {
  const { data } = await instance.delete<DashboardInvitations>(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
  return data;
};

export default deleteDashboardInvitation;
