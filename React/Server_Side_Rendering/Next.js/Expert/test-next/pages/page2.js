import { async } from 'regenerator-runtime';
import { callApi } from '../api';
import Router from 'next/router';

Page2.getInitialProps = async ({ query }) => {
  throw new Error('exception in getInitialProps');
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};

export default function Page2({ text, data }) {
  return (
    <div>
      <button onClick={() => Router.push('/page1')}>pag1 으로 이동</button>
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
    </div>
  );
}
