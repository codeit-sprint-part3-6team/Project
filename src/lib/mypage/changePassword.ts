import instance from '../instance';

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}

export default async function changePassword(data: ChangePasswordData) {
  try {
    const res = await instance.put(`/11-6/auth/password`, data);
    return res;
  } catch (error) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
}
