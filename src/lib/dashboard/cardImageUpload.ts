import instance from '../instance';

export default async function cardImageUpload(
  file: File,
  targetId: number,
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await instance.post(
      `/11-6/columns/${targetId}/card-image`,
      formData,
    );

    return res.data.imageUrl;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`이미지 업로드에 실패했어요: ${error.message}`);
    } else {
      throw new Error('이미지 업로드에 실패했어요: 알 수 없는 오류');
    }
  }
}
