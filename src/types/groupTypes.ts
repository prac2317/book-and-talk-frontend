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
};
