// @mui
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// _mock
import { _faqs } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <div>
      {faqData.map((accordion, index) => (
        <Accordion key={index}>
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



const faqData = [
    {
        question: "What is This Sign is Online?",
        answer: "This Sign is Online is a platform designed to facilitate seamless online signing experiences. It allows users to electronically sign documents, contracts, and agreements from anywhere, using any device. It simplifies the signing process, enhances security, and ensures legal compliance."
    },
    {
        question: "How can I use This Sign is Online?",
        answer: "Using This Sign is Online is easy! Simply create an account, upload your document, add signature fields where needed, and send it for signing. Recipients can sign electronically from their own devices, making the entire process efficient and convenient."
    },
    {
        question: "Is This Sign is Online secure?",
        answer: "Yes, security is a top priority at This Sign is Online. We use industry-standard encryption and security measures to protect your documents and personal information. Your data is kept confidential and secure throughout the signing process."
    },
    {
        question: "How can I get started with This Sign is Online?",
        answer: "Getting started with This Sign is Online is quick and straightforward. Simply visit our website, sign up for an account, and start uploading your documents for electronic signing. Our intuitive interface guides you through the process step-by-step."
    },
    {
        question: "Can I sign documents from my mobile device?",
        answer: "Absolutely! This Sign is Online is fully responsive and works smoothly on mobile phones and tablets. Whether you're on Android or iOS, you can review and sign documents on the go with ease."
    },
    {
        question: "Is my electronic signature legally valid?",
        answer: "Yes, electronic signatures made through This Sign is Online are legally valid and compliant with major e-signature laws like the ESIGN Act and eIDAS. Signed documents are legally binding and hold the same weight as handwritten signatures."
    }
];
