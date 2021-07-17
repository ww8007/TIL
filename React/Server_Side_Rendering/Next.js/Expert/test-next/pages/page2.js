import { async } from 'regenerator-runtime';
import { callApi } from '../api';

Page2.getInitialProps = async ({ query }) => {
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};

export default function Page2({ text, data }) {
  function onClick() {
    import('../sayHello').then(({ sayHello }) => console.log(sayHello()));
  }
  return (
    <div>
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
      <button onClick={onClick}>sayHello</button>
    </div>
  );
}
