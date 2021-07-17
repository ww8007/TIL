import Head from 'next/head';
import Icon from '../static/icon.png';
import { add } from '../src/util';
import styled from 'styled-components';

const MyP = styled.div`
  color: blue;
  font-size: 18pt;
`;

function Page1() {
  return (
    <div>
      <MyP>{`10 + 20 = ${add(10, 20)}`}</MyP>
      <MyP>This is Home MyPage</MyP>
      <img src={Icon} />
      <Head>
        <title>page1</title>
      </Head>
      <Head>
        <meta name="description" content="hello world" />
      </Head>
      <style jsx>{`
        p {
          color: blue;
          font-size: 18pt;
        }
      `}</style>
    </div>
  );
}

export default Page1;
