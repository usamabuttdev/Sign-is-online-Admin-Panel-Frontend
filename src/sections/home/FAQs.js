import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import { MotionViewport, varFade } from "src/components/animate";
import { m } from "framer-motion";
import Iconify from "src/components/iconify";


const FAQs = () => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <Container component={MotionViewport} maxWidth="md" sx={{ my: 4 }}>
            <m.div variants={varFade().inUp}>
                <Typography variant="h3" sx={{  marginBottom: 4,textAlign:'center' }} gutterBottom>
                    Everything you need to know about This Sign Is Online.
                </Typography>

                {faqData.map((faq, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                        sx={{  boxShadow: "none", py: '4px' }}

                    >
                        <AccordionSummary
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: { xs: '500', md: "bold" }, fontSize: { xs: '14px', md: '16px' } }}>{faq.question}</Typography>
                            <Typography fontWeight="bold" sx={{ ml: "auto", color: 'primary.main', fontSize: '20px' }}>
                                {expanded === index ? <Iconify icon="line-md:minus" /> : <Iconify icon="ic:outline-plus" />}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ fontWeight: { xs: '500' }, fontSize: { xs: '14px', md: '16px' } }}>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </m.div>
        </Container>
    );
};
export default FAQs;

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
