import { Checkbox, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import ArrowDown from 'assets/icon/arrow-down.svg';
import { BaseAutocomplete, Container, Error, Label } from './AutoComplete.style';

export default function MultipleAutoComplete({
  label,
  options,
  loading,
  value,
  isRequired,
  errorText,
  onChange,
  getOptionLabelCustom,
  renderOptionCustom,
}) {
  const getOptionLabelDefault = (option) => option.label;
  const renderOptionDefault = (props, option, { selected }) => (
    <MenuItem {...props} style={{ padding: 0 }} disabled={option?.locked}>
      <Checkbox checked={selected} />
      <div className="label">{option.label}</div>
    </MenuItem>
  );
  return (
    <Container>
      {label && (
        <Label>
          {label}
          {isRequired && '*'}
        </Label>
      )}
      <BaseAutocomplete
        multiple
        disableClearable
        id="tags-outlined"
        loading={loading}
        value={value}
        options={options}
        getOptionLabel={getOptionLabelCustom || getOptionLabelDefault}
        renderInput={(params) => <TextField {...params} />}
        renderOption={renderOptionCustom || renderOptionDefault}
        onChange={onChange}
        popupIcon={<ArrowDown />}
        ListboxProps={{ style: { maxHeight: 250 } }}
      />
      {!!errorText && <Error>{errorText}</Error>}
    </Container>
  );
}
