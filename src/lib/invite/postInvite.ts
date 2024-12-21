import instance from '../instance';

type InviteProps = {
  id: number;
  email: string;
};

type InviteResponse = {
  createdAt: string;
  dashboard: {
    id: number;
    title: string;
  };
  id: number;
  inviteAccepted: boolean;
  invitee: {
    email: string;
    id: number;
    nickname: string;
  };
  inviter: {
    email: string;
    id: number;
    nickname: string;
  };
  teamId: string;
  updatedAt: string;
};

const postInvite = async ({
  id,
  email,
}: InviteProps): Promise<InviteResponse> => {
  try {
    const { data } = await instance.post(`11-6/dashboards/${id}/invitations`, {
      email,
    });
    return data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
};

export default postInvite;
