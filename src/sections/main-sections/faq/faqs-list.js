import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import EditFaqForm from './edit-faq-modal';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useDeleteFaqMutation } from 'src/store/Reducer/faqs';
import { useSnackbar } from 'src/components/snackbar';
import { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function FaqsList({ allFaqs, setOpen, setIsEdit }) {
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
      const response = await deleteFaq(_id).unwrap();

      // Handle success
      if (!response?.error) {
        enqueueSnackbar(response?.message || 'Deleted Successfully', { variant: 'success', autoHideDuration: 2000 });
      } 
    } catch (error) {
      console.error('Error deleting menu item:', error);
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
              <IconButton color="default" onClick={() => handleEdit(faq)}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => openDeleteModal(faq?._id)}
              >
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
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
        content="Are you sure you want to delete this faq?"
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
