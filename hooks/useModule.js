import { REGEX } from '@/config/constant/regex';
import _ from 'lodash';
import { useSelector } from 'react-redux';
const regex = new RegExp(REGEX.VARIABLE_NAME);

const useModule = () => {
  const moduleState = useSelector((state) => state.userModule);
  const { duplicateNames } = useSelector((state) => state.modules);

  const checkMapToFunction = (objectType, mapToFunc) => {
    const globalVariables = [];
    moduleState.sources?.functions?.forEach((func) => {
      func?.globalVariables?.forEach((vari) => {
        if (vari?.objectType === objectType) {
          globalVariables.push(`${func?._id}-${vari?.label}`);
        }
      });
    });
    // get difference
    const difference = _.difference(globalVariables, mapToFunc);
    // get error functionId
    const errorFunctions = _.uniq(difference.map((item) => item?.split('-')[0]));
    return errorFunctions;
  };

  const convertMapToFunctionMapping = (data) => {
    const mapToFunc = [];
    data?.forEach((item) => {
      item?.functions?.forEach(({ func, variable }) => {
        mapToFunc.push(`${func}-${variable}`);
      });
    });
    return mapToFunc;
  };

  const checkValidateMapping = (data, funcIds = []) => {
    let numErr = 0;
    let listMapFunction = [];

    // const duplicateNames = _.uniq(data?.map(({ label }) => label).filter((v, i, vIds) => !!v && vIds.indexOf(v) !== i));

    data?.forEach((item) => {
      if (item?.label.trim()) {
        if (duplicateNames?.includes(item.label)) {
          numErr++;
          item.error = true;
          item.errorText = 'Variable name cannot be duplicated';

          item?.functions?.forEach(({ func }) => {
            funcIds.push(func);
          });
        } else {
          if (!regex.test(item?.label?.trim())) {
            numErr++;
            item.error = true;
            item.errorText = 'Invalid variable name';
            item?.functions?.forEach(({ func }) => {
              funcIds.push(func);
            });
          } else {
            item.error = false;
            item.errorText = null;
          }
        }
      } else if (item.errorText) {
        numErr++;
      }

      // convert list map to function
      const tempMap = item?.functions?.map(({ func, variable }) => {
        return `${func}-${variable}`;
      });
      listMapFunction = _.concat(listMapFunction, tempMap);
    });

    const errorMap = checkMapToFunction('mappings', listMapFunction);
    funcIds = _.concat(_.uniq(_.compact(funcIds)), errorMap);

    return { data, numErr, funcIds };
  };

  return {
    checkMapToFunction,
    convertMapToFunctionMapping,
    checkValidateMapping,
  };
};

export default useModule;
