import instance from '@/lib/instance';

const getMembers = async ({ teamId, page = 1, size = 20, dashboardId }) => {
  try {
    const response = await instance.get(`/${teamId}/members/`, {
      params: {
        page,
        size,
        dashboardId,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`이미지 업로드에 실패했어요: ${error.message}`);
    } else {
      throw new Error('이미지 업로드에 실패했어요: 알 수 없는 오류');
    }
  }
};

export default getMembers;
