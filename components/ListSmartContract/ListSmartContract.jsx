import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TemplateItem from '../TemplateItem/TemplateItem';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';

const ListSmartContract = ({ data, status }) => {
  const { userContract } = useDispatch();
  const userState = useSelector((state) => state.player);
  const [dataUserContracts, setDataUserContracts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);
  const [meta, setMeta] = useState([]);

  const getUserContracts = async () => {
    try {
      const res = {};
      if (status === 'all') {
        res = await userContract.getAllUserContracts({
          page: page - 1, //cause page default start at 0
          size: size,
        });
      } else if (status === 'drafts') {
        res = await userContract.getUserContractDraff({
          page: page - 1, //cause page default start at 0
          size: size,
        });
      } else {
        res = await userContract.getUserContractDeployed({
          page: page - 1, //cause page default start at 0
          size: size,
        });
      }

      setDataUserContracts(res.data);
      setMeta(res.meta);
    } catch (error) {
      console.log('Failed to fetch modules');
      return;
    }
  };

  useEffect(() => {
    userState.playerInfo && getUserContracts();
  }, [page, userState.playerAuth?._id, userState.playerInfo]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={2}>
        <Box sx={{ background: '#1E1E1F', height: '100%' }}></Box>
      </Grid>
      <Grid item xs={10}>
        <Scrollbars
          style={{
            height: 'calc(100vh - 200px)',
            overflowX: 'hidden',
          }}
          autoHide>
          <Box sx={{ fontSize: '14px', alignItems: 'center', minHeight: '70vh' }}>
            <Grid container columnSpacing={{ md: 2, lg: 4, xl: 2 }} rowSpacing={{ md: 2, lg: 6, xl: 6 }}>
              {dataUserContracts?.map((item, key) => {
                return (
                  <Grid item xs={4} key={key}>
                    <TemplateItem key={key} data={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
            <Pagination
              sx={{
                '& .MuiPagination-ul': {
                  '& .Mui-selected': {
                    backgroundColor: '#F07D60',
                    color: 'white',
                  },
                  '& .Mui-selected:hover': {
                    backgroundColor: '#F07D60',
                  },
                  '& .MuiPaginationItem-icon': {
                    color: '#F07D60',
                  },
                },
              }}
              variant="outlined"
              shape="rounded"
              count={meta.totalPage}
              defaultPage={1}
              page={page}
              onChange={(_, value) => {
                setPage(value);
                //scroll to titleDialog
              }}
            />
          </Box>
        </Scrollbars>
      </Grid>
    </Grid>
  );
};
export default ListSmartContract;
