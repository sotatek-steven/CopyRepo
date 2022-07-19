import useObjectTab from '@/components/ObjectTabPanel/hooks/useObjectTab';
import useStructPage from '@/components/StructTabPanel/hooks/useStructPage';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const useModulePage = () => {
  const { object, userModule } = useDispatch();
  const { getStructs } = useStructPage();
  const { convertToObjectShow } = useObjectTab();
  const router = useRouter();
  const { id } = router.query;

  const fetchDetailModule = async () => {
    if (!id) return;
    object.setObjects([]);
    const data = await userModule.getDetailModule(id);

    getStructs(data?.sources?.structs);
    convertToObjectShow(data?.variables?.structs);
    userModule.set(data);
  };

  return {
    fetchDetailModule,
  };
};

export default useModulePage;
