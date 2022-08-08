import { ELEMENT_TYPE, EVENT_ERROR_OPTION, EVENT_ERROR_TYPE, VALUE_TYPE_OPTIONS } from '@/config/constant/common';
import SingleAutoComplete from '../AutoComplete/SingleAutoComplete';
import { Input } from '../Input';
import {
  ButtonWrapper,
  EventParameters,
  Item,
  TypeContainer,
  ItemContainer,
  ItemParam,
  MapFunctions,
  RemoveButton,
} from './EventErrorTab.style';
import AddIcon from 'assets/icon/addIcon.svg';
import RemoveIcon from 'assets/icon/removeIcon.svg';
import { PrimaryButton } from '../ButtonStyle';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const TOOLTIP_NAME = (
  <div>
    <div>
      {`The rules of setting event name is the same as rules for settings State variable name (as Value, Object or Mapping
      type): detailed rules will be specified in the message`}
    </div>
    <div>
      {`Event name should not bear the same charater and case as any function's name inside the contract and even the
      contract's name itself`}
    </div>
  </div>
);

const EventErrorItem = ({
  dataItem,
  handleRemoveItem,
  handleChangeItem,
  handleAddParam,
  handleRemoveParam,
  handleChangeParam,
}) => {
  const moduleState = useSelector((state) => state.userModule);
  const { dataEventError } = useSelector((state) => state.eventError);
  const lstFuncUsed = dataEventError?.map((data) => data?.function);

  const listFunction = useMemo(() => {
    return moduleState?.sources?.functions?.reduce((array, item) => {
      let temp = [];
      if (dataItem?.type === EVENT_ERROR_TYPE.EVENT && item?.events.length) {
        temp = item?.events.map((event) => {
          return {
            value: `${item?._id}-${event?._id}`,
            label: `(${item?.name})(${event?.name})`,
          };
        });
      } else if (dataItem?.type === EVENT_ERROR_TYPE.ERROR && item?.errors.length) {
        temp = item?.errors.map((error) => {
          return {
            value: `${item?._id}-${error?._id}`,
            label: `(${item?.name})(${error?.name})`,
          };
        });
      }
      return array?.concat(temp);
    }, []);
  }, [moduleState?.sources?.functions, dataItem?.type]);

  return (
    <ItemContainer>
      <TypeContainer>
        <Item>
          <SingleAutoComplete
            label={'CHOOSE TYPE'}
            value={EVENT_ERROR_OPTION.find((type) => type.value === dataItem?.type)}
            options={EVENT_ERROR_OPTION}
            onChange={(e, newValue) => handleChangeItem(dataItem?._id, 'type', newValue, ELEMENT_TYPE.SELECT)}
          />
        </Item>
        {dataItem?.type && (
          <>
            <Item>
              <Input
                isRequired={true}
                label={dataItem?.type === EVENT_ERROR_TYPE.EVENT ? 'EVENT NAME' : 'ERROR NAME'}
                value={dataItem?.name}
                tooltip={TOOLTIP_NAME}
                errorText={dataItem?.errorName}
                onChange={(e) => handleChangeItem(dataItem?._id, 'name', e, ELEMENT_TYPE.INPUT)}
              />
            </Item>
          </>
        )}
        <ButtonWrapper>
          <PrimaryButton width="100px" height="45px" onClick={() => handleRemoveItem(dataItem?._id)}>
            <RemoveButton />
            Remove
          </PrimaryButton>
        </ButtonWrapper>
      </TypeContainer>
      {dataItem?.type && (
        <EventParameters>
          <div className="title">
            {dataItem?.type === EVENT_ERROR_TYPE.EVENT && 'Event Parameters'}
            {dataItem?.type === EVENT_ERROR_TYPE.ERROR && 'Error Parameters'}
          </div>
          <div className="content">
            {dataItem?.parameters?.map((param, index) => (
              <ItemParam key={index}>
                <Item>
                  <SingleAutoComplete
                    label={'Type'}
                    value={VALUE_TYPE_OPTIONS.find((type) => type.value === param?.type)}
                    options={VALUE_TYPE_OPTIONS}
                    onChange={(e, newValue) =>
                      handleChangeParam(dataItem?._id, param?._id, newValue, 'type', ELEMENT_TYPE.SELECT)
                    }
                  />
                </Item>
                <Item>
                  <Input
                    isRequired={true}
                    label={'Name'}
                    value={param?.name}
                    errorText={param?.errorName}
                    onChange={(e) => handleChangeParam(dataItem?._id, param?._id, e, 'name', ELEMENT_TYPE.INPUT)}
                  />
                </Item>
                <div className="action-icon" onClick={() => handleRemoveParam(dataItem?._id, param?._id)}>
                  <RemoveIcon />
                </div>
              </ItemParam>
            ))}
            <div className="action-icon">
              <AddIcon onClick={() => handleAddParam(dataItem?._id)} />
            </div>
          </div>
        </EventParameters>
      )}
      {dataItem?.type && (
        <MapFunctions>
          <SingleAutoComplete
            label={'Map to function'}
            value={listFunction?.find((item) => dataItem?.function === item.value)}
            options={listFunction?.filter(
              (item) => dataItem?.function === item.value || !lstFuncUsed.includes(item.value)
            )}
            onChange={(e, newValue) => handleChangeItem(dataItem?._id, 'function', newValue, ELEMENT_TYPE.SELECT)}
          />
        </MapFunctions>
      )}
    </ItemContainer>
  );
};

export default EventErrorItem;
