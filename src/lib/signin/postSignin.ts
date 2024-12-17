import instance from '../instance';

type valuesProps = {
  email: string;
  password: string;
};

type userDataResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createAt: string;
    updatedAt: string;
  };
};

export const postSignin = async (
  values: valuesProps,
): Promise<userDataResponse> => {
  try {
    const { data } = await instance.post('11-6/auth/login', values);
    return data;
  } catch (error: any) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '정보를 불러오는데 실패했습니다.',
    );
  }
};
