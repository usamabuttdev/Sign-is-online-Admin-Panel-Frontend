import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Iconify from "src/components/iconify";
import { fNumber } from "src/utils/format-number";
import { formatDate } from "src/utils/format-time";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { useDeleteProductMutation } from "src/store/Reducer/products";
import { useSnackbar } from "src/components/snackbar";

export default function ProductsTableRow({ row, selected, onEdit }) {
  const { id, title, current_price, current_price_ends, next_price, next_price_starts, locations, subscription_length } = row;
  const priceEnds = formatDate(current_price_ends);
  const nextStarts = formatDate(next_price_starts);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
      enqueueSnackbar("Product deleted", { variant: "success" });
      setConfirmOpen(false);
    } catch (err) {
      enqueueSnackbar(err?.data?.message || "Failed to delete product", { variant: "error" });
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="center">{id}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell align="right">{current_price ?? subscription_length ?? "—"}</TableCell>
        <TableCell align="center">
          <Tooltip title={priceEnds.full} arrow>
            <span>{priceEnds.display}</span>
          </Tooltip>
        </TableCell>
        <TableCell align="right">{next_price ?? "—"}</TableCell>
        <TableCell align="center">
          <Tooltip title={nextStarts.full} arrow>
            <span>{nextStarts.display}</span>
          </Tooltip>
        </TableCell>
        <TableCell align="right">{fNumber(locations)}</TableCell>

        <TableCell sx={{ px: 1, whiteSpace: "nowrap" }}>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton onClick={onEdit}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="View" placement="top" arrow>
            <IconButton onClick={() => router.push(`${paths.dashboard.products.profile}/${id}`)}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top" arrow>
            <IconButton color="error" onClick={() => setConfirmOpen(true)}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete product?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soft-delete &quot;{title}&quot;? It will be hidden from the active list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <LoadingButton color="error" variant="contained" loading={isDeleting} onClick={handleDelete}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProductsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
