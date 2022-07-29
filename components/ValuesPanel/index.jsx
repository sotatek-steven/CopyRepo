import React from 'react';
import AddIcon from 'assets/icon/addIcon2.svg';
import { Container, BodyContent } from './ValueTab.style';
import ValueItem from './ValueItem';
import useValuesTab from './hooks/useValuesTab';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { Item, ItemContainer } from './ValueTab.style';
import { TITLE_VALUES_TAB } from '@/config/constant/common';
import IconInfo from 'assets/icon/icon-info.svg';
import { isArray } from 'lodash';

const ValuesTabPanel = () => {
  const { values, handleAddValues, handleRemoveValue, handleChangeValue } = useValuesTab();
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
        {TITLE_VALUES_TAB.map((item) => (
          <Item key={item.id}>
            {item.label}
            {item.value === 'variable_name' && (
              <Tooltip
                arrow
                placement="top"
                title="Beginning character : Must be letter. Following characters only contain: Letter, digits, (_)">
                <IconButton sx={{ padding: '0', margin: '0 0 6px 10px' }}>
                  <IconInfo sx={{ color: theme.palette.primary.light }} />
                </IconButton>
              </Tooltip>
            )}
          </Item>
        ))}
      </ItemContainer>

      <BodyContent>
        {isArray(values) &&
          values?.map((value) => (
            <ValueItem
              key={value?._id}
              value={value}
              handleRemoveValue={handleRemoveValue}
              handleChangeValue={handleChangeValue}
            />
          ))}
      </BodyContent>
      <Box
        sx={{
          position: 'absolute',
          right: '6%',
          paddingY: 2,
          '@media screen and (max-width:1500px )': {
            right: '4%',
          },
        }}>
        <IconButton aria-label="delete" onClick={handleAddValues}>
          <AddIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Box>
    </Container>
  );
};

export default ValuesTabPanel;
