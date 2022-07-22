import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeViewTab = ({ sources }) => {
  const theme = useTheme();
  const allLines = useMemo(() => {
    let lines = '';
    if (!sources) return;
    lines = sources.join('\n');
    return lines;
  }, [sources]);

  return (
    <Scrollbars style={{ height: 'calc(100vh - 74px)', background: theme.palette.background.dark }}>
      <SyntaxHighlighter
        language="solidity"
        style={a11yDark}
        wrapLongLines
        customStyle={{
          overflow: 'hidden',
          padding: '150px 117px 0px',
          margin: 0,
          background: theme.palette.background.dark,
        }}>
        {allLines}
      </SyntaxHighlighter>
    </Scrollbars>
  );
};

export default CodeViewTab;
