import { ASSIGN_TYPE_OPTION, ELEMENT_TYPE, IS_ARRAY_OPTION, LOCATION_TYPE_OPTION } from '@/config/constant/common';
import { Checkbox, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';
import FormModal from '../FormModal';
import { Input } from '../Input';
import useDeclaration from './hooks/useDeclaration';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingLeft: 10,
  gap: 30,
}));

const ItemContainer = styled('div')(({ theme }) => ({
  width: '25%',
}));

const CheckBoxContainer = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 30,
}));

const tooltipText = (
  <div>
    <div>{`Beginning character: Must be letter or this icon '_'`}</div>
    <div>{`Following characters only contain: Letters, digits, and this icon '_'`}</div>
    <div>
      {`Local var name should not take the same name (matching all characters' cases) as state variables, contract/module name, function name, parameter name or any existing variable name under the same function`}
    </div>
  </div>
);

const DeclarationModal = ({ open, onClose, onComfirm }) => {
  const theme = useTheme();
  const { dataDeclaration, listType, handleChange, isShowInputText, isShowLocation } = useDeclaration();

  return (
    <FormModal
      width={900}
      open={open}
      onClose={onClose}
      title={'Declaration'}
      closeText={'Cancel'}
      confirmText={'Continue'}
      onConfirm={onComfirm}>
      <Container>
        <ItemContainer>
          <SingleAutoComplete
            label={'Type'}
            colorLabel={theme.palette.text.primary}
            value={listType?.find((type) => type.value === dataDeclaration?.type)}
            options={listType}
            onChange={(e, newValue) => handleChange('type', ELEMENT_TYPE.SELECT, newValue)}
          />
        </ItemContainer>
        <ItemContainer>
          <SingleAutoComplete
            label={'Array'}
            colorLabel={theme.palette.text.primary}
            value={IS_ARRAY_OPTION.find((type) => type.value === dataDeclaration?.isArray)}
            options={IS_ARRAY_OPTION}
            onChange={(e, newValue) => handleChange('isArray', ELEMENT_TYPE.SELECT, newValue)}
          />
        </ItemContainer>
        {isShowLocation() && (
          <ItemContainer>
            <SingleAutoComplete
              label={'Location'}
              colorLabel={theme.palette.text.primary}
              value={LOCATION_TYPE_OPTION.find((type) => type.value === dataDeclaration?.location)}
              options={LOCATION_TYPE_OPTION}
              onChange={(e, newValue) => handleChange('location', ELEMENT_TYPE.SELECT, newValue)}
            />
          </ItemContainer>
        )}
        <ItemContainer>
          <Input
            label="Name"
            typeLabel={'basic'}
            value={dataDeclaration?.name}
            tooltip={tooltipText}
            onChange={(e) => handleChange('name', ELEMENT_TYPE.INPUT, e)}
          />
        </ItemContainer>
      </Container>
      <CheckBoxContainer>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon />}
          checkedIcon={<CheckBoxIcon />}
          checked={dataDeclaration?.isAssign}
          onClick={(e) => handleChange('isAssign', ELEMENT_TYPE.CHECK, e)}
        />
        Assign value
      </CheckBoxContainer>
      <Container>
        {dataDeclaration?.isAssign && (
          <ItemContainer>
            <SingleAutoComplete
              value={ASSIGN_TYPE_OPTION.find((type) => type.value === dataDeclaration?.assignType)}
              options={ASSIGN_TYPE_OPTION}
              onChange={(e, newValue) => handleChange('assignType', ELEMENT_TYPE.SELECT, newValue)}
            />
          </ItemContainer>
        )}
        {isShowInputText() && (
          <ItemContainer>
            <Input
              value={dataDeclaration?.inputText}
              onChange={(e) => handleChange('inputText', ELEMENT_TYPE.INPUT, e)}
            />
          </ItemContainer>
        )}
      </Container>
    </FormModal>
  );
};

export default DeclarationModal;
