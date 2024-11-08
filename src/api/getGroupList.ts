import API from './api.ts';
import { Group } from '../types/index.ts';

export const getGroupList = async (isbn: string): Promise<Group[]> => {
  const data = {
    ISBN13: isbn,
  };
  const res = await API.get('api/groups', { json: data });
  return res.json();
};
