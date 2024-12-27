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
  } catch (error) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '프로필을 수정하는데 실패했어요',
    );
  }
}
