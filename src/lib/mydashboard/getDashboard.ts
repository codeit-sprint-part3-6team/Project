import { Dashboard } from '@/type/dashboard';
import instance from '../instance';

export interface GetDashboardsParams {
  cursorId?: number;
  page: number;
  size: number;
  navigationMethod: 'infiniteScroll' | 'pagination';
}

export interface GetDashboardsResponse {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
}

export default async function getDashboards(
  params: GetDashboardsParams,
): Promise<GetDashboardsResponse> {
  try {
    const { data } = await instance.get<GetDashboardsResponse>(
      `/11-6/dashboards/`,
      {
        params: {
          ...params,
          navigationMethod: params.navigationMethod || 'infiniteScroll',
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
}
