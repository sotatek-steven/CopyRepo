import { ELEMENT_TYPE, EVENT_ERROR_OPTION, EVENT_ERROR_TYPE, generateDataType } from '@/config/constant/common';
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
import MultipleAutoComplete from '../AutoComplete/MultipleAutoComplete';

const EventErrorItem = ({
  typeParam,
  dataItem,
  handleRemoveItem,
  handleChangeItem,
  handleAddParam,
  handleRemoveParam,
  handleChangeParam,
}) => {
  const moduleState = useSelector((state) => state.userModule);
  const { dataEvent } = useSelector((state) => state.event);

  const getTooltip = (type) => {
    return (
      <div>
        <div>
          {`The rules of setting event name is the same as rules for setting State variable name (as Value, Object or Mapping
      type): detailed rules will be specified in the message`}
        </div>
        <div>
          {`${type} name should not bear the same character and case as any state variable names, any function's name inside the contract and even the
      contract's name itself`}
        </div>
      </div>
    );
  };

  const lstFuncUsed = dataEvent?.reduce((array, data) => {
    const temp = data?.functions?.map((func) => func);
    return array?.concat(temp);
  }, []);

  const listFunction = useMemo(() => {
    let listFunction = moduleState?.sources?.functions?.reduce((array, item) => {
      let temp = [];
      temp = item?.events.map((event) => {
        const typeParam = event?.params?.map((param) => param?.type);

        return {
          type: typeParam?.toString(),
          value: `${item?._id}-${event?.name}`,
          label: `(${item?.name})(${event?.name})`,
        };
      });
      return array?.concat(temp);
    }, []);

    if (dataItem?.parameters?.length) {
      const paramSelected = dataItem?.parameters?.map((item) => item?.type)?.toString();
      listFunction = listFunction?.filter((func) => func?.type === paramSelected);
    }

    return listFunction;
  }, [moduleState?.sources?.functions, dataItem?.type, dataItem?.parameters, typeParam]);

  return (
    <ItemContainer>
      <TypeContainer>
        <Item>
          <SingleAutoComplete
            label={'CHOOSE TYPE'}
            value={EVENT_ERROR_OPTION.find((type) => type.value === dataItem?.type)}
            options={EVENT_ERROR_OPTION.filter((item) => item?.value === 'events')}
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
                tooltip={getTooltip(dataItem?.type === EVENT_ERROR_TYPE.EVENT ? 'Event' : 'Error')}
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
          <div className="title">Event Parameters</div>
          <div className="content">
            {dataItem?.parameters?.map((param, index) => (
              <ItemParam key={index}>
                <Item>
                  <SingleAutoComplete
                    label={'Type'}
                    value={generateDataType().find((type) => type.value === param?.type)}
                    options={generateDataType()}
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
          <MultipleAutoComplete
            multiple={true}
            label={'Map to function'}
            value={listFunction?.filter((item) => dataItem?.functions?.includes(item.value))}
            options={listFunction?.filter(
              (item) => dataItem?.functions.includes(item.value) || !lstFuncUsed.includes(item.value)
            )}
            onChange={(e, newValue) => handleChangeItem(dataItem?._id, 'functions', newValue, ELEMENT_TYPE.SELECT)}
          />
        </MapFunctions>
      )}
    </ItemContainer>
  );
};

export default EventErrorItem;
