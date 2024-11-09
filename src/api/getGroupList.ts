import API from './api.ts';
import { GroupListResponse } from '../types/index.ts';

export const getGroupList = async (isbn: string): Promise<GroupListResponse> => {
  // get 요청에는 body에 json을 담을 수 없다고 한다!!
  // const data = {
  //   isbn13: isbn,
  // };
  // const res = await API.get('api/groups', { json: data });

  const res = await API.get('api/groups', {
    searchParams: { isbn13: isbn }, // 쿼리 파라미터로 전달
  });

  console.log("getGroupList");
  const jsonResponse: GroupListResponse = await res.json();

  return {
    totalCount: jsonResponse.totalCount,
    data: jsonResponse.data,
  };
};
