export interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface SelectedMember {
  nickname: string;
  profileImageUrl: string;
}

export interface CreateCardParams {
  title: string;
  description: string;
  formattedDate: string | null;
  tags: string[];
  image: File | null;
  selectedMember: SelectedMember;
}
