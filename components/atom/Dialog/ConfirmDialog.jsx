import { Modal } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../ButtonStyle';
import { BoxActions, Container, ContentText, Title } from './Dialog.style';

const ConfirmDialog = ({ title, content, onClose, onAgree, open }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Container>
      <Title>{title}</Title>
      {content && <ContentText id="alert-dialog-description">{content}</ContentText>}
      <BoxActions>
        <SecondaryButton onClick={onClose}>No</SecondaryButton>
        <PrimaryButton onClick={onAgree}>Yes</PrimaryButton>
      </BoxActions>
    </Container>
  </Modal>
);

export default ConfirmDialog;
