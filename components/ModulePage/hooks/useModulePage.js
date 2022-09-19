import useEnumPage from '@/components/EnumTabPanel/hooks/useEnumPage';
import useErrorTab from '@/components/ErrorTabPanel/hooks/useErrorTab';
import useEventErrorTab from '@/components/EventTabPanel/hooks/useEventTab';
import useObjectTab from '@/components/ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '@/components/StructTabPanel/hooks/useStructPage';
import useValuesTab from '@/components/ValuesPanel/hooks/useValuesTab';
import { EVENT_ERROR_TYPE, INIT_VALUE_TYPE } from '@/config/constant/common';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useModulePage = () => {
  const { object, userModule, value, initialModule, functions } = useDispatch();
  const { getStructs } = useStructPage();
  const { getEnums } = useEnumPage();
  const { convertToObjectShow } = useObjectTab();
  const { converToValueShow } = useValuesTab();
  const { convertToEventShow } = useEventErrorTab();
  const { convertToErrorShow } = useErrorTab();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { moduleId } = router.query;

  const fetchDetailModule = async () => {
    setLoading(true);
    try {
      if (!moduleId) return;

      const data = await userModule.getDetailModule(moduleId);
      const events = data?.sources?.events.map((item) => {
        return {
          ...item,
          type: EVENT_ERROR_TYPE.EVENT,
        };
      });
      const errors = data?.sources?.errors.map((item) => {
        return {
          ...item,
          type: EVENT_ERROR_TYPE.ERROR,
        };
      });

      await functions.getAllUserFunctions();
      getStructs(data?.sources?.structs);
      getEnums(data?.sources?.enums);
      convertToObjectShow(data?.variables?.structs);
      converToValueShow(data?.variables?.values);
      convertToEventShow(events, 'get');
      convertToErrorShow(errors, 'get');
      userModule.set(data);
      initialModule.setData(data);
    } catch (error) {
      object.setObjects([]);
      value.setValues(INIT_VALUE_TYPE);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchDetailModule };
};

export default useModulePage;
