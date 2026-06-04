import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FaqsList from '../faqs-list';
import { Button, Card, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useGetAllFaqsQuery } from 'src/store/Reducer/faqs';
import AddFaqForm from '../add-faq-modal';
import { useBoolean } from 'src/hooks/use-boolean';
import { LoadingScreen } from 'src/components/loading-screen';

export default function DashboardFaqView() {

  const quickOpen = useBoolean();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState(null);

  // const {
  //   data,
  //   isLoading,
  //   // status,
  //   // refetch
  // } = useGetAllFaqsQuery({
  //   // pageno: page,
  //   // search: filters.name,
  // });


  return (
    <>
      {/* {isLoading ? (
        <LoadingScreen />
      ) : ( */}
        <Container
          sx={{
            pb: 2,
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>

            <Typography
              variant="h3"
              sx={{
                my: { xs: 2, md: 1 },
              }}
            >
              Frequently Asked Questions
            </Typography>

            <Button
              variant='contained'
              color='primary'
              onClick={quickOpen.onTrue}
              sx={{ px: 2.5, py: 1 }}
            >
              Add FAQ
            </Button>
          </Box>

          <Card>
            {data?.data?.length === 0 && (
              <Typography p={3}>
                Sorry, No FAQs available.
              </Typography>
            )}

            <Box gap={1}>
              <FaqsList allFaqs={data?.data} setOpen={setOpen} setIsEdit={setIsEdit} isEdit={isEdit} setSelectedFaq={setSelectedFaq} />
            </Box>

          </Card>
        </Container >
      {/* )} */}

      <AddFaqForm open={quickOpen.value} onClose={quickOpen.onFalse} />
    </>
  );
}


const data={
  data: [
    {
      id: 1,
      question: 'What is the purpose of this FAQ?',
      answer: 'This FAQ provides answers to common questions about our services.',
    },
    {
      id: 2,
      question: 'How can I contact support?',
      answer: 'You can contact support via email or phone.',
    },
  ],
}