import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSample } from '../hooks/useSample';
import { getPost, getUsers } from '../module/sample';
const SampleContainer = () => {
  useEffect(() => {});
  const { post, users, loadingPost, loadingUsers } = useSample();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(1));
    // dispatch(getUsers());
  });
  return (
    <>
      <section>
        {!loadingPost && (
          <div>
            <>
              <h3>{post.title}</h3>
              <h3>{post.body}</h3>
            </>
          </div>
        )}
        {loadingPost && '로딩중...'}
      </section>
      <hr />
      {/* <section>
        {loadingUsers && (
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
      </section> */}
      {/* {!loadingUsers && '로딩중...'} */}
    </>
  );
};

export default React.memo(SampleContainer);
