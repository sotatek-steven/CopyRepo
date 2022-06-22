import React from 'react';
import { useRouter } from 'next/router';
import { SecondaryButton } from '../ButtonStyle';

const ExitButton = () => {
  const route = useRouter();
  return (
    <SecondaryButton
      width="105px"
      onClick={() => {
        route.push('/');
      }}>
      Exit
    </SecondaryButton>
  );
};

export default ExitButton;
