import React from 'react';
import { PrimaryButton } from '../ButtonStyle';
import AddIcon from 'assets/icon/addIcon.svg';
import { Container, BodyContent, Footer } from './ValueTab.style';
import ValueItem from './ValueItem';
import useValuesTab from './hooks/useValuesTab';
import { Box, Grid, IconButton, Tooltip, useTheme } from '@mui/material';
import { Item, ItemContainer, ButtonWrapper } from './ValueTab.style';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const listTitle = [
  'VALUE_TYPE',
  'IS_ARRAY',
  'SCOPE',
  'IS_CONSTANT',
  'VARIABLE_NAME *',
  'VARIABLE_VALUE',
  'IS_DEFAULT_VALUE',
  'MAP_TO_FUNCTION',
];

const ValuesTabPanel = () => {
  const { values, handeAddValues } = useValuesTab();
  const theme = useTheme();

  return (
    <Container>
      <ItemContainer
        sx={{
          backgroundColor: theme.palette.background.dark,
          padding: '9px 0px 10px 6px',
          borderRadius: '4px',
          width: `calc(100% - 25px)`,
        }}>
        {listTitle.map((item, index) => (
          <Item key={index}>
            {item}
            {item === 'VARIABLE_NAME *' && (
              <Tooltip title="Somethings">
                <IconButton>
                  <ReportGmailerrorredIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
              </Tooltip>
            )}
          </Item>
        ))}
      </ItemContainer>

      <BodyContent>
        {values?.map((value) => (
          <ValueItem key={value?._id} value={value} />
        ))}
      </BodyContent>
      {/* <Footer>
        <PrimaryButton width="150px" height="45px" onClick={handleAddObject}>
          <AddIcon />
          Add Object
        </PrimaryButton>
      </Footer> */}
    </Container>
  );
};

export default ValuesTabPanel;
