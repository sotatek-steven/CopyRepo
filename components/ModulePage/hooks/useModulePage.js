import useObjectTab from '@/components/ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '@/components/StructTabPanel/hooks/useStructPage';
import useValuesTab from '@/components/ValuesPanel/hooks/useValuesTab';
import { INIT_VALUE_TYPE } from '@/config/constant/common';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const useModulePage = () => {
  const { object, userModule, value, initialModule, functions } = useDispatch();
  const { getStructs } = useStructPage();
  const { convertToObjectShow } = useObjectTab();
  const { converToValueShow } = useValuesTab();
  const router = useRouter();
  const { id } = router.query;

  const fetchDetailModule = async () => {
    if (!id) return;
    object.setObjects([]);
    value.setValues(INIT_VALUE_TYPE);
    const data = await userModule.getDetailModule(id);

    functions.getAllUserFunctions();
    getStructs(data?.sources?.structs);
    convertToObjectShow(data?.variables?.structs, data?.sources?.structs);
    converToValueShow(data?.variables?.values);
    userModule.set(data);
    initialModule.setData(data);
  };

  return {
    fetchDetailModule,
  };
};

export default useModulePage;
