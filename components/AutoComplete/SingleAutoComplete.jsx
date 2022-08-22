import TextField from '@mui/material/TextField';
import ArrowDown from 'assets/icon/arrow-down.svg';
import { BaseAutocomplete, Container, Error, Label } from './AutoComplete.style';

export default function SingleAutoComplete({
  label,
  colorLabel,
  options,
  loading,
  value = { value: '', label: '' },
  isRequired,
  errorText,
  onChange,
  getOptionLabelCustom,
  renderOptionCustom,
  disabled = false,
}) {
  const getOptionLabelDefault = (option) => option.label;
  const renderOptionDefault = (props, option) => (
    <div className="item" component="li" {...props}>
      {option.label}
    </div>
  );
  return (
    <Container>
      {label && (
        <Label colorLabel={colorLabel}>
          {label}
          {isRequired && '*'}
        </Label>
      )}
      <BaseAutocomplete
        id="combo-box-demo"
        autoHighlight
        disableClearable
        disabled={!!disabled}
        loading={loading}
        options={options}
        value={value}
        getOptionLabel={getOptionLabelCustom || getOptionLabelDefault}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
        renderOption={renderOptionCustom || renderOptionDefault}
        onChange={onChange}
        popupIcon={<ArrowDown />}
        ListboxProps={{ style: { maxHeight: 190 } }}
      />
      {!!errorText && <Error>{errorText}</Error>}
    </Container>
  );
}
