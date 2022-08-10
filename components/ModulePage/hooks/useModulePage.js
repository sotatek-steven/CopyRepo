import useEventErrorTab from '@/components/EventErrorTabPanel/hooks/useEventErrorTab';
import useObjectTab from '@/components/ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '@/components/StructTabPanel/hooks/useStructPage';
import useValuesTab from '@/components/ValuesPanel/hooks/useValuesTab';
import { EVENT_ERROR_TYPE, INIT_VALUE_TYPE } from '@/config/constant/common';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const useModulePage = () => {
  const { object, userModule, value, initialModule, functions } = useDispatch();
  const { getStructs } = useStructPage();
  const { convertToObjectShow } = useObjectTab();
  const { converToValueShow } = useValuesTab();
  const { convertToEventErrorShow } = useEventErrorTab();
  const router = useRouter();
  const { id } = router.query;

  const fetchDetailModule = async () => {
    if (!id) return;
    object.setObjects([]);
    value.setValues(INIT_VALUE_TYPE);
    const data = await userModule.getDetailModule(id);
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
    convertToObjectShow(data?.variables?.structs);
    converToValueShow(data?.variables?.values);
    convertToEventErrorShow(_.concat(events, errors));
    userModule.set(data);
    initialModule.setData(data);
  };

  return {
    fetchDetailModule,
  };
};

export default useModulePage;
