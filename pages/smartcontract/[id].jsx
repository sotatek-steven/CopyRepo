import React, { useEffect, useMemo, useState } from 'react';
import ModuleDrag from '@/components/ModuleDrag';
import ModuleDrop from '@/components/ModuleDrop';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { createEdges, createNodes } from '@/components/ModuleDrop/CreateElement';
import { Box, Card, Tab, useTheme } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import DesignLayout from '@/components/layout/DesignLayout';
import { useSelector } from 'react-redux';
import SmartContractActionList from '@/components/SmartContractPage/SmartContractActionList';

const Design = () => {
  const { contract } = useDispatch();
  const contractState = useSelector((state) => state.contract);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [sources, setSource] = useState(null);
  const [value, setValue] = useState('1');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    contract.getDetailContract(id);
  }, [id, contract]);
  useEffect(() => {
    if (!contractState.current?._id) return;
    const { coordinates: modulesData } = contractState.current;
    const _nodes = createNodes(modulesData);
    const _edges = createEdges(_nodes);
    setNodes(_nodes);
    setEdges(_edges);
    setSource(contractState.current.sources);
  }, [contractState.current]);

  const allLines = useMemo(() => {
    const lines = '';
    if (!sources) return;

    _.isArray(sources) &&
      sources.forEach((item, index) => {
        const stringFile = item.lines.join('\n');
        lines = lines.concat(stringFile).concat('\n\n');
      });

    return lines;
  }, [sources]);

  return (
    <Box className="test">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, paddingTop: '14px', position: 'absolute', zIndex: '10', paddingLeft: '40px' }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              borderRadius: '16px',
              background: theme.palette.background.light,
              boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 2px rgba(0, 0, 0, 0.25)',
              '.MuiTabs-indicator': {
                display: 'none',
              },
              textTransform: 'none',
              '.MuiButtonBase-root': {
                textTransform: 'none',
              },
              display: 'flex',
              alignItems: 'center',
              '	.Mui-selected': {
                background: theme.palette.primary.main,
                borderRadius: '14px',
                color: `${theme.palette.text.primary} !important`,
              },
              '.MuiTab-root': {
                padding: '0px 7px',
              },
              '.MuiTabs-flexContainer': {
                padding: '4px 0px',
              },
            }}>
            <Tab sx={{ fontSize: 18, transform: 'scale(0.85, 0.78)' }} label="Workflow view" value="1" />
            <Tab sx={{ fontSize: 18, transform: 'scale(0.85, 0.78)' }} label="Code View" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: '0 !important' }}>
          <div
            style={{
              display: 'flex',
              height: 'calc(100vh - 74px)',
            }}>
            <div style={{ flexGrow: 1 }}>{nodes && <ModuleDrop initialNodes={nodes} initialEdges={edges} />}</div>
            {contractState.current.status !== 'deployed' && (
              <div
                style={{
                  height: '100%',
                  width: '444px',
                }}>
                <ModuleDrag />
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: '0 !important' }}>
          <Scrollbars style={{ height: 'calc(100vh - 74px)', width: '100%' }}>
            <>
              <Card
                sx={{
                  marginBottom: '0px',
                  overflowX: 'hidden !important',
                }}>
                <SyntaxHighlighter
                  language="solidity"
                  style={a11yDark}
                  wrapLongLines
                  customStyle={{ overflow: 'hidden', paddingTop: '60px', marginTop: 0 }}>
                  {allLines}
                </SyntaxHighlighter>
              </Card>
            </>
          </Scrollbars>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Design;
Design.PageLayout = (props) => DesignLayout({ children: props.children, actionList: <SmartContractActionList /> });
