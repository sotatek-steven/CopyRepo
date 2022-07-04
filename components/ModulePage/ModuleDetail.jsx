import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormModal from '../FormModal';

const ModuleDetail = ({ open, onClose, moduleId }) => {
  const { userModule } = useDispatch();
  const [moduleInfo, setModuleInfo] = useState({});
  useEffect(async () => {
    if (open && moduleId) {
      const data = await userModule.getDetailModule(moduleId);
      setModuleInfo(data);
    }
  }, [open, moduleId]);

  return (
    <FormModal
      height={600}
      width={750}
      open={open}
      onClose={onClose}
      title={'Mintable Token Details'}
      showFooter={false}>
      <div>Module Detail</div>
    </FormModal>
  );
};

export default ModuleDetail;
