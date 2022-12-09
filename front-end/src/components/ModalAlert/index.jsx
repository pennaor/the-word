import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import { useState, useEffect } from 'react';
import useModal from '../../hooks/useModal';

const FADE_TIME_MODEL = 500;

const Modal = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function ModalTitle({ title, onClose }) {
  return (
    <DialogTitle sx={ { m: 0, p: 2 } }>
      { title }
      <IconButton
        onClick={ onClose }
        sx={ {
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        } }
      >
        <Icon>close</Icon>
      </IconButton>
    </DialogTitle>
  );
}

function ModalBody({ message }) {
  return (
    <DialogContent dividers>
      <Typography gutterBottom>
        { message }
      </Typography>
    </DialogContent>
  );
}

function ModalActions({ onClose }) {
  return (
    <DialogActions>
      <Button
        autoFocus
        onClick={ onClose }
      >
        Voltar
      </Button>
    </DialogActions>
  );
}

export default function ModalAlert() {
  const [open, setOpen] = useState(false);

  const { modal, clearModal } = useModal();

  useEffect(() => {
    setOpen(!!(modal.title && modal.message));
  }, [modal]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(clearModal, FADE_TIME_MODEL);
  };

  return (
    <Modal
      onClose={ handleClose }
      open={ open }
    >
      <ModalTitle
        title={ modal.title }
        onClose={ handleClose }
      />
      <ModalBody
        message={ modal.message }
      />
      <ModalActions
        onClose={ handleClose }
      />
    </Modal>
  );
}
