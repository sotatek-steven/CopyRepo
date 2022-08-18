import FunctionActionList from '@/components/functionsPage/FunctionActionList';
import DesignLayout from '@/components/layout/DesignLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const FunctionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userFunction } = useDispatch();

  useEffect(() => {
    const fetchDetailFunction = async () => {
      try {
        if (!id) return;
        const data = await userFunction.getDetailFunction(id);
        userFunction.update(data);
      } catch (error) {
        console.log('Failed to fetch detail function: ', error);
      }
    };

    fetchDetailFunction();
    return () => {
      userFunction.update({});
    };
  }, [id]);

  return <div>Function ID: {id}</div>;
};

FunctionPage.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <FunctionActionList /> });

export default FunctionPage;
