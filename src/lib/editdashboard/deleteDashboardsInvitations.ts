import instance from '../instance';

const deleteInvitation = async (dashboardId: number, invitationId: number) => {
  try {
    await instance.delete(
      `/11-6/dashboards/${dashboardId}/invitations/${invitationId}`,
    );
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default deleteInvitation;
