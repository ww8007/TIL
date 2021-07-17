import { callApi } from '../src/api';

Page2.getInitialProps = async ({ query }) => {
  const { sayHello } = await import('../src/sayHello');
  console.log(sayHello());
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};

export default function Page2({ text, data }) {
  function onClick() {
    import('../src/sayHello').then(({ sayHello }) => console.log(sayHello()));
  }
  return (
    <div>
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
      {/* <button onClick={onClick}>sayHello</button> */}
    </div>
  );
}
