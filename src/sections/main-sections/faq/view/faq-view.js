import { Button, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetAllFaqsQuery } from 'src/store/Reducer/faqs';
import AddFaqForm from '../add-faq-modal';
import FaqsList from '../faqs-list';

export default function DashboardFaqView() {

  const quickOpen = useBoolean();

  const { data, isLoading } = useGetAllFaqsQuery();

  return (
    <>
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
          {!isLoading && data?.data?.length === 0 && (
            <Typography p={3}>
              Sorry, No common questions available.
            </Typography>
          )}

          <Box gap={1}>
            <FaqsList allFaqs={data?.data} />
          </Box>

        </Card>
      </Container>

      <AddFaqForm open={quickOpen.value} onClose={quickOpen.onFalse} />
    </>
  );
}


