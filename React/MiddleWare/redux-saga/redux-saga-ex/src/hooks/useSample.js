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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(1));
    dispatch(getUsers());
  }, [dispatch]);
  return {
    post,
    users,
    loadingPost,
    loadingUsers,
  };
}

export default function Sample() {
  const { post, users, loadingPost, loadingUsers } = useSample();
  return (
    <>
      <section>
        {console.log(post)}
        {loadingPost && '로딩중...'}
        {!loadingPost && post && (
          <div>
            <>
              <h3>{post.title}</h3>
              <h3>{post.body}</h3>
            </>
          </div>
        )}
      </section>
      <hr />
      <section>
        {loadingUsers && '로딩중...'}
        {!loadingUsers && users && (
          <>
            <h1>사용자 목록</h1>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.id}({user.email})
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
