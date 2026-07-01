// @mui
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FaqsList({ faqs }) {
  const items = faqs?.filter((f) => f.isactive !== false) || [];

  return (
    <div>
      {items.map((accordion, index) => (
        <Accordion key={accordion.id || index}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.question}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
