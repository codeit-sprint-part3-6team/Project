import instance from '../instance';

export interface PostColumnsParams {
  title: string;
  dashboardId: number;
}

export interface PostColumnsResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default async function postColumns(
  params: PostColumnsParams,
): Promise<PostColumnsResponse> {
  try {
    const { title, dashboardId } = params;

    const { data } = await instance.post<PostColumnsResponse>(
      `/11-6/columns`,
      { title, dashboardId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || '컬럼 등록에 실패했습니다.',
      );
    }
    throw new Error('컬럼 등록 요청 중 문제가 발생했습니다.');
  }
}
