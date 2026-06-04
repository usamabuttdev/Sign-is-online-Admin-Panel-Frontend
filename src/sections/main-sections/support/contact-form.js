import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MotionViewport } from 'src/components/animate';
import ContactTable from './ContactTable';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export default function ContactForm() {
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Stack component={MotionViewport} spacing={5}>
          <ContactTable
            totalContacts={[]}
            status={''}
            handleChangePage={handleChangePage}
            page={page}
          />
    </Stack>
  );
}
