import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none'
};

export default function ImagePreviewModal({ open, imageUrl, onClose }: {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ width: '100%', height: 'auto', maxHeight: '70vh' }}
          />
        )}
      </Box>
    </Modal>
  );
}