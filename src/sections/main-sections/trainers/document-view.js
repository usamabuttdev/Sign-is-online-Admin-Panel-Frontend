import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography, CardMedia, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function DocumentView({ open, onClose }) {

  const [verificationStatus, setVerificationStatus] = useState('');

  const documentsVerificationOptions = [
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'submitted',
      label: 'Submitted',
    },
    {
      value: 'verified',
      label: 'Verified',
    },
    {
      value: 'rejected',
      label: 'Rejected',
    },
  ];
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <DialogTitle>Verify Document</DialogTitle>

      <DialogContent>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          sx={{ marginTop: '.5rem', justifyItems: 'center' }} // Centering items
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
          }}
        >

      <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Verification Status</InputLabel>

          <Select
            value={verificationStatus}
            onChange={(event)=> setVerificationStatus(event.target.value)}
            input={<OutlinedInput label="Verification Status" />}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {documentsVerificationOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          {/* Front Side */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
              Front Side
            </Typography>
            <CardMedia
              component="img"
              image="https://befitappbucket.s3.eu-north-1.amazonaws.com/e5d234e7-518b-4312-ad39-9b99e4ed28c9.jpg" // Replace with your actual image URL
              alt="Front Side"
              sx={{ width: 300, height: 200, objectFit: 'cover' }}
            />
          </Box>

          {/* Back Side */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
              Back Side
            </Typography>
            <CardMedia
              component="img"
              image="https://befitappbucket.s3.eu-north-1.amazonaws.com/81b0988e-c255-4dbe-abc6-8ff42fd7dd10.png" // Replace with your actual image URL
              alt="Back Side"
              sx={{ width: 300, height: 200, objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DocumentView.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
