import instance from '../instance';

type memberProps = [
  {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
    userId: number;
  },
];

export const getMember = async (
  id: string | string[],
): Promise<memberProps> => {
  try {
    const response = await instance.get(`11-6/members?dashboardId=${id}`);
    return response.data.members;
  } catch (error) {
    console.error('대시보드 멤버 조회 실패 : ', error);
  }
};

export const getDashboard = async (id: string | string[]) => {
  try {
    const response = await instance.get(`11-6/dashboards/${id}`);
    return response.data;
  } catch (error) {
    console.error('대시보드 정보 조회 실패 :', error);
  }
};
