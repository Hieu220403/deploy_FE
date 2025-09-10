import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({
  open,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xoá người dùng</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xoá người dùng này? Hành động này không thể hoàn
          tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Huỷ
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
}
