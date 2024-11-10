export type Group = {
  groupId: number;
  name: string;
  participants: number;
  maxParticipants: number;
  startDate: Date;
  duration: number;
  createdAt: Date;
  status: '모집중' | '모집완료';
  bookId: number;
  groupImage: string;
};

export interface GroupListResponse {
  totalCount: number;
  data: Group[];
}

export interface FormData {
  name: string;
  maxParticipants: number;
  startDate: string;
  duration: number;
  groupDescription: string;
  bookId: number | null;
  location: string;
  groupImage: File | null;
}
