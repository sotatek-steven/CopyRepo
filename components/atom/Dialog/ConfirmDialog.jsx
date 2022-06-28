import { Modal } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../ButtonStyle';
import { BoxActions, Container, ContentText, Title, CloseButton } from './Dialog.style';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmDialog = ({ title, content, onClose, onAgree, onDisagree, open, closeText = 'No', agreeText = 'Yes' }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Container>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <Title>{title}</Title>
      {content && <ContentText id="alert-dialog-description">{content}</ContentText>}
      <BoxActions>
        <SecondaryButton onClick={onDisagree || onClose}>{closeText}</SecondaryButton>
        <PrimaryButton onClick={onAgree}>{agreeText}</PrimaryButton>
      </BoxActions>
    </Container>
  </Modal>
);

export default ConfirmDialog;
