import instance from '../instance';

type valuesProps = {
  email: string;
  nickname: string;
  password: string;
};

type userDataResponse = {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const postSignup = async (
  values: valuesProps,
): Promise<userDataResponse> => {
  try {
    const { data } = await instance.post('11-6/users', values);
    return data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
};
