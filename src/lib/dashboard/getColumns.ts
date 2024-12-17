import axios from '@/lib/instance';
import { GetColumnParams, GetColumnsResponse } from '@/type/column';

const getColumns = async ({
  teamId,
  dashboardId,
}: GetColumnParams): Promise<GetColumnsResponse> => {
  try {
    const response = await axios.get(`/${teamId}/columns/`, {
      params: {
        dashboardId,
      },
    });

    if (response.status === 200) return response.data;
    throw new Error('컬럼을 불러오는 데 실패했습니다.');
  } catch (error) {
    console.error('컬럼 조회 실패 : ', error);
    throw error;
  }
};

export default getColumns;
