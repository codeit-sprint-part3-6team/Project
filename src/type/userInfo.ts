export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoState {
  user: User;
}
