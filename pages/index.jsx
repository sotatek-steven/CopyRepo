// import NumberStatistic from 'modules/home/NumberStatistic';
// import Reference from 'modules/home/Reference';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/PageLayout';

// const HomePage = () => (
//   <>
//     <Head>
//       <title>Drag Drop</title>
//     </Head>
//   </>
// );

const HomePage = () => {
  const route = useRouter();
  route.push('/dashboard');
  return <></>
};

export default HomePage;
HomePage.PageLayout = Layout;
