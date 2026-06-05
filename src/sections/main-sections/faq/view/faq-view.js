import { Button, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import AddFaqForm from '../add-faq-modal';
import FaqsList from '../faqs-list';

export default function DashboardFaqView() {

  const quickOpen = useBoolean();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState(null);

  const [data, setData] = useState({  })

  // const {
  //   data,
  //   isLoading,
  //   // status,
  //   // refetch
  // } = useGetAllFaqsQuery({
  //   // pageno: page,
  //   // search: filters.name,
  // });

useEffect(() => {
  setData(
    {
      data: [
        {
          id: 1,
          question: 'What is the purpose of this Common Question?',
          answer: 'This Common Question provides answers to common questions about our services.',
          public: true,
        },
        {
          id: 2,
          question: 'How can I contact support?',
          answer: 'You can contact support via email or phone.',
          public: false,
        },
      ],
    }
  )
 }, [])


  // ✅ Add new FAQ
  const handleAddFaq = (newFaq) => {
    setData((prev) => ({
      data: [...prev.data, { ...newFaq, id: prev.data.length + 1 }],
    }));
  };

  // ✅ Edit FAQ
  const handleEditFaq = (updatedFaq) => {
    setData((prev) => ({
      data: prev.data.map((faq) =>
        faq.id === updatedFaq.id ? { ...faq, ...updatedFaq } : faq
      ),
    }));
  };

  // ✅ Delete FAQ
  const handleDeleteFaq = (id) => {
    console.log(id ,'id')
    setData((prev) => ({
      data: prev.data.filter((faq) => faq.id !== id),
    }));
  };
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
            Common Questions
          </Typography>

          <Button
            variant='contained'
            color='primary'
            onClick={quickOpen.onTrue}
            sx={{ px: 2.5, py: 1 }}
          >
            Add
          </Button>
        </Box>

        <Card>
          {data?.data?.length === 0 && (
            <Typography p={3}>
              Sorry, No common questions available.
            </Typography>
          )}

          <Box gap={1}>
            <FaqsList allFaqs={data?.data} setOpen={setOpen} setIsEdit={setIsEdit} isEdit={isEdit} setSelectedFaq={setSelectedFaq}                
              onEditFaq={handleEditFaq}
              onDeleteFaq={handleDeleteFaq}
            />
          </Box>

        </Card>
      </Container >
      {/* )} */}

      <AddFaqForm open={quickOpen.value} onClose={quickOpen.onFalse} onAddFaq={handleAddFaq}
      />
    </>
  );
}


