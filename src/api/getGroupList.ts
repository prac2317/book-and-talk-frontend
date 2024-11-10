import API from './api.ts';
import { GroupListResponse } from '../types/index.ts';

export const getGroupList = async (isbn: string): Promise<GroupListResponse> => {

  const res = await API.get('api/groups', {
    searchParams: { isbn13: isbn }, // 쿼리 파라미터로 전달
  });

  const jsonResponse: GroupListResponse = await res.json();

  return {
    totalCount: jsonResponse.totalCount,
    data: jsonResponse.data,
  };
};
