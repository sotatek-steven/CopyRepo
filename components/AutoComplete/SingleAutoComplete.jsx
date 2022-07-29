import TextField from '@mui/material/TextField';
import ArrowDown from 'assets/icon/arrow-down.svg';
import { BaseAutocomplete, Error, Label } from './AutoComplete.style';

export default function SingleAutoComplete({
  label,
  options,
  loading,
  value,
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
    <>
      {label && (
        <Label>
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
    </>
  );
}
