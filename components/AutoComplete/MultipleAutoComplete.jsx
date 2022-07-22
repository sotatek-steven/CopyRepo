import { Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import ArrowDown from 'assets/icon/arrow-down.svg';
import { BaseAutocomplete, Error, Label } from './AutoComplete.style';

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
    <li {...props} style={{ padding: 0 }}>
      <Checkbox checked={selected} />
      <div className="label">{option.label}</div>
    </li>
  );
  return (
    <>
      {label && (
        <Label>
          {label}
          {isRequired && '*'}
        </Label>
      )}
      <BaseAutocomplete
        multiple
        disableClearable
        limitTags={1}
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
    </>
  );
}
