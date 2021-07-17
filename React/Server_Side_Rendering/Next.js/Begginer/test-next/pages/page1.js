import Head from 'next/head';
import Icon from '../static/icon.png';
import Link from 'next/link';
function Page1() {
  return (
    <div>
      <Link href="/page2">
        <a>페이지2로 이동</a>
      </Link>
      <p>This is Home Page</p>
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
