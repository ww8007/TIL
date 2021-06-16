import React, { useEffect } from 'react';
import { getPost, getUsers } from '../modules/sample';
import { useDispatch, useSelector } from 'react-redux';
import useActions from '../lib/useActions';
import Sample from '../components/Sample';
const SampleContainer = () => {
  const dispatch = useDispatch();
  const { post, users, loadingPost, loadingUsers } = useSelector(
    ({ sample, loading }) => ({
      post: sample.post,
      users: sample.users,
      loadingPost: loading['sample/GET_POST'],
      loadingUsers: loading['sample/GET_USERS'],
    })
  );

  useEffect(() => {
    dispatch(getPost(1));
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    ></Sample>
  );
};

export default SampleContainer;
