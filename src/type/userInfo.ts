export interface User {
  id: number | null;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoState {
  user: User;
}
