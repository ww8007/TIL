import { useDispatch, useSelector } from 'react-redux';
import { getPost, getUsers } from '../module/sample';
import { useCallback, useEffect } from 'react';
export function useSample() {
  const { post, users, loadingPost, loadingUsers } = useSelector(
    ({ sample, loading }) => ({
      post: sample.post,
      users: sample.users,
      loadingPost: loading['sample/GET_POST'],
      loadingUsers: loading['sample/GET_USERS'],
    })
  );

  return {
    post,
    users,
    loadingPost,
    loadingUsers,
  };
}
