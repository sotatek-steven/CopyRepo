import React, { useEffect, useMemo, useState } from 'react';
import DesignSmartContractNav from 'components/SmartContractNav';
import ModuleDrag from '@/components/ModuleDrag';
import ModuleDrop from '@/components/ModuleDrop';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { createEdges, createNodes } from '@/components/ModuleDrop/CreateElement';
import { Box, Card, CardHeader, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars';
import { a11yDark, dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import DesignLayout from '@/components/layout/DesignLayout';
import { useSelector } from 'react-redux';

const PageContainer = styled('div')(({ theme }) => ({
  height: `calc(100vh -10px)`,
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.mode === 'dark' ? '#3D3D3E' : '#3D3D3E',
}));

const Design = () => {
  const { contract } = useDispatch();
  const contractState = useSelector((state) => state.contract);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [sources, setSource] = useState(null);
  const [value, setValue] = useState('1');
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useUserBackup();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    contract.getDetailContract(id);
    // const fetchDetailContract = async () => {
    //   try {
    //     if (!id) return;
    //     const contractDetail = await contract.getDetailContract(id);
    //     if (!contractDetail) return;
    //     const { coordinates: modulesData } = contractDetail;
    //     const _nodes = createNodes(modulesData);
    //     const _edges = createEdges(_nodes);
    //     setNodes(_nodes);
    //     setEdges(_edges);
    //     setSource(contractDetail.sources);
    //   } catch (error) {
    //     console.log('Failed to fetch detail contract', error);
    //   }
    // };
    // fetchDetailContract();
  }, [id]);
  useEffect(() => {
    if (!contractState?._id) return;
    const { coordinates: modulesData } = contractState;
    const _nodes = createNodes(modulesData);
    const _edges = createEdges(_nodes);
    setNodes(_nodes);
    setEdges(_edges);
    setSource(contractState.sources);
  }, [contractState]);

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
    <div>
      <Box className="test">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 0, paddingTop: '14px', position: 'absolute', zIndex: '10', paddingLeft: '40px' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                borderRadius: '16px',
                background: '#595655',
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
                  background: '#F07D60',
                  borderRadius: '14px',
                  color: '#E1E1E1 !important',
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
              {contractState.status !== 'deployed' && (
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
    </div>
  );
};

export default Design;
Design.PageLayout = DesignLayout;
