import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import ImportLibrary from './ImportLibrary';
import SearchLibrary from './SearchLibrary';

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.light,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
}));

const Header = styled('h1')(({ theme }) => ({
  fontSize: 28,
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: 20,
  margin: 0,
}));

const Body = styled('div')(({ theme }) => ({
  padding: 28,
  background: theme.palette.background.default,
  flexGrow: 1,
}));

const SectionWrapper = styled('div')(() => ({
  padding: '0px 10px',
}));

const ImportLibraries = () => {
  const libraryState = useSelector((state) => state.library);
  const moduleState = useSelector((state) => state.userModule);
  const { libraries } = moduleState.sources;
  const { library } = useDispatch();

  useEffect(() => {
    const fetchLiraries = async () => {
      const { data } = await library.getAllUserLibraries();
      library.update(data);
    };

    fetchLiraries();
  }, []);
  // const [scrollTopProgess, setScrollTopProgess] = useState(0);
  // const [paging, setPaging] = useState({
  //   page: 0,
  //   size: 20,
  //   count: -1,
  //   totalPage: -1,
  // });

  // const handleScrollFrame = (value) => {
  //   const _top = Math.floor(value.top);
  //   setScrollTopProgess(_top);
  // };

  // useEffect(() => {
  //   if (scrollTopProgess < 1) return;
  //   const { page } = paging;
  //   setPaging((paging) => ({ ...paging, page: page + 1 }));
  // }, [scrollTopProgess]);

  // useEffect(() => {
  //   const fetchLiraries = async () => {
  //     const { data, meta } = await library.getAllUserLibraries();
  //     library.add(data);
  //     setPaging(meta);
  //   };
  //   if (!paging) return;

  //   const { page, totalPage } = paging;
  //   if (page === 0 || page < totalPage) {
  //     fetchLiraries();
  //     return;
  //   }
  // }, [paging.page]);

  return (
    <Container>
      <Header>Import Library</Header>
      <Body>
        <SectionWrapper>
          <SearchLibrary />
        </SectionWrapper>
        <Scrollbars
        // onScrollFrame={handleScrollFrame}
        >
          <SectionWrapper>
            {libraryState.map((library) => {
              const { name, _id } = library;
              const hidden = libraries.filter((item) => item === name).length !== 0 ? true : false;
              return <ImportLibrary key={_id} name={name} hidden={hidden} />;
            })}
          </SectionWrapper>
        </Scrollbars>
      </Body>
    </Container>
  );
};

export default ImportLibraries;
