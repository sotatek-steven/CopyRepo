import React, { useMemo } from 'react';
import { Card, styled } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import _ from 'lodash';

const ScrollbarsContainer = styled(Scrollbars)(() => ({
  width: '100%',
}));

const CardContainer = styled(Card)(() => ({
  marginBottom: '0px',
  overflowX: 'hidden !important',
}));

const CodeViewTab = ({ sources }) => {
  const allLines = useMemo(() => {
    let lines = '';
    if (!sources) return;

    _.isArray(sources) &&
      sources.forEach((item, index) => {
        const stringFile = item.lines.join('\n');
        lines = lines.concat(stringFile).concat('\n\n');
      });

    return lines;
  }, [sources]);

  return (
    <ScrollbarsContainer>
      <CardContainer>
        <SyntaxHighlighter
          language="solidity"
          style={a11yDark}
          wrapLongLines
          customStyle={{ overflow: 'hidden', paddingTop: '60px', marginTop: 0 }}>
          {allLines}
        </SyntaxHighlighter>
      </CardContainer>
    </ScrollbarsContainer>
  );
};

export default CodeViewTab;
