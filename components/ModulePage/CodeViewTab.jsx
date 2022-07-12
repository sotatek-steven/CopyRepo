import React, { useMemo } from 'react';
import { Card, styled } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import _ from 'lodash';

const CardContainer = styled(Card)(() => ({
  marginBottom: '0px',
  overflowX: 'hidden !important',
  height: '100%',
}));

const CodeViewTab = ({ sources }) => {
  const allLines = useMemo(() => {
    let lines = '';
    if (!sources) return;
    lines = sources.join('\n');
    return lines;
  }, [sources]);

  return (
    <Scrollbars style={{ height: 'calc(100vh - 74px)', background: 'red' }}>
      <CardContainer>
        <SyntaxHighlighter
          language="solidity"
          style={a11yDark}
          wrapLongLines
          customStyle={{ overflow: 'hidden', padding: '150px 117px 0px', marginTop: 0, height: '100%' }}>
          {allLines}
        </SyntaxHighlighter>
      </CardContainer>
    </Scrollbars>
  );
};

export default CodeViewTab;
