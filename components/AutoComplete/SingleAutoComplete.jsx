import TextField from '@mui/material/TextField';
import ArrowDown from 'assets/icon/arrow-down.svg';
import { BaseAutocomplete, Label } from './AutoComplete.style';

export default function SingleAutoComplete({
  label,
  options,
  loading,
  value,
  isRequired,
  onChange,
  getOptionLabelCustom,
}) {
  const getOptionLabelDefault = (option) => option.label;
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
        renderOption={(props, option) => (
          <div className="item" component="li" {...props}>
            {option.label}
          </div>
        )}
        onChange={onChange}
        popupIcon={<ArrowDown />}
        ListboxProps={{ style: { maxHeight: 190 } }}
      />
    </>
  );
}
