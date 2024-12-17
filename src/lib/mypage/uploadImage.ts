import instance from '../instance';

export default async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await instance.post(`/11-6/users/me/image`, formData);

    return res.data.profileImageUrl;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`이미지 업로드에 실패했어요: ${error.message}`);
    } else {
      throw new Error('이미지 업로드에 실패했어요: 알 수 없는 오류');
    }
  }
}
