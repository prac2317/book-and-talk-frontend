import API from './api.ts';

export const getGroupList = async (ISBN: string) => {
  const data = {
    ISBN: ISBN,
  };
  const res = await API.get('api/groups', { json: data });
  return res.json();
};
