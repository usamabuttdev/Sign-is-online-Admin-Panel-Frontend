import { Button, IconButton, Tooltip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDeleteFaqMutation } from 'src/store/Reducer/faqs';
import EditFaqForm from './edit-faq-modal';

export default function FaqsList({ allFaqs }) {
  const { enqueueSnackbar } = useSnackbar();

  const quickEdit = useBoolean();
  const confirm = useBoolean();

  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedDeleteFaq, setSelectedDeleteFaq] = useState(null);

  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const handleEdit = (faq) => {
    setSelectedFaq(faq)
    quickEdit.onTrue()
  }

  const openDeleteModal = (faqId) => {
    setSelectedDeleteFaq(faqId)
    confirm.onTrue()
  }

  const handleDelete = async (_id) => {
    try {
      await deleteFaq(_id).unwrap();
      enqueueSnackbar('Deleted successfully', { variant: 'success' });
      confirm.onFalse();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred.';
      enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <>
      {allFaqs?.map((faq, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1" sx={{ py: 1, pr: 2, display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'capitalize' }}>
              {faq.question}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>{faq.answer}</Typography>

            <Box>
              <Tooltip title="Edit" arrow placement="top">
                <IconButton color="default" onClick={() => handleEdit(faq)}>
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete" arrow placement="top">
                <IconButton color="error" onClick={() => openDeleteModal(faq?.id)}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </Box>
          </AccordionDetails>
        </Accordion >
      ))
      }

      <EditFaqForm row={selectedFaq} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm Action"
        content="Are you sure you want to delete this common question?"
        action={
          <Button
            variant="contained"
            color="error"
            loading={isDeleting}
            onClick={() => {
              handleDelete(selectedDeleteFaq);
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
