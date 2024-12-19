import instance from '../instance';

const deleteInvitation = async (dashboardId: number, invitationId: number) => {
  const { data } = await instance.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
  return data;
};

export default deleteInvitation;
