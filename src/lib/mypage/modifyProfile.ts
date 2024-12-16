import instance from '../instance';

export interface ModifyProfileData {
  nickname: string;
  profileImageUrl: string;
}

export interface ModifiedProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default async function modifyProfile(
  data: ModifyProfileData,
): Promise<ModifiedProfileResponse> {
  try {
    const res = await instance.put(`/11-6/users/me`, data);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`프로필 수정에 실패했어요: ${error.message}`);
    } else {
      throw new Error('프로필 수정에 실패했어요: 알 수 없는 오류');
    }
  }
}
