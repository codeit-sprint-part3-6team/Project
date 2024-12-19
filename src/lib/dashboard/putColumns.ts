import instance from '../instance';

export interface PutColumnsParams {
  title: string;
  columnId: number;
}

export interface PutColumnsResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default async function putColumns(
  params: PutColumnsParams,
): Promise<PutColumnsResponse> {
  const { title, columnId } = params;

  try {
    const { data } = await instance.put<PutColumnsResponse>(
      `11-6/columns/${columnId}`,
      { title },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      console.log('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '컬럼 수정에 실패했습니다.',
    );
  }
}
