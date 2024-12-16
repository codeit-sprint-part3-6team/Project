import instance from '../instance';

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}

export default async function changePassword(data: ChangePasswordData) {
  try {
    await instance.put(`/11-6/auth/password`, data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`비밀번호 변경에 실패했어요: ${error.message}`);
    } else {
      throw new Error('비밀번호 변경에 실패했어요: 알 수 없는 오류');
    }
  }
}
