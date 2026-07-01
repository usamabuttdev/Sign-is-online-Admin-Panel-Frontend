import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/system';

import { useTheme } from '@mui/material/styles';
import { useGetContentQuery, useUpdateContentMutation } from 'src/store/Reducer/adminSetting';
import { LoadingScreen } from 'src/components/loading-screen';
import FaqsHero from 'src/sections/faqs/faqs-hero';
import { enqueueSnackbar } from 'notistack';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const DEFAULT_HTML = `<h1>Terms & Conditions</h1>
<p>
  Welcome to <strong>Sign In Online</strong>. By using our platform, you agree to the following terms and conditions.
</p>

<h2>1. Acceptance of Terms</h2>
<p>
  By accessing or using Sign In Online, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
</p>

<h2>2. Use of Service</h2>
<p>
  You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
</p>

<h2>3. Limitation of Liability</h2>
<p>
  Sign In Online shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
</p>`;

export default function DashboardTacView() {
  const theme = useTheme();
  const [text, setText] = useState('');

  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();
  const { data, isLoading } = useGetContentQuery('terms-conditions');

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = async () => {
    if (!text) {
      return enqueueSnackbar('Please enter content.', { variant: 'error' });
    }

    try {
      const response = await updateContent({ title: 'terms-conditions', html: text }).unwrap();
      if (response.success) {
        enqueueSnackbar('Content updated successfully', { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error?.data?.message || 'Failed to update content', { variant: "error" });
    }
  };

  useEffect(() => {
    if (data) {
      setText(data?.html || DEFAULT_HTML);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <FaqsHero data={'Terms  &  Conditions'} />

          <Stack mt={3}>

            <StyledPaper
              elevation={3}
              sx={{
                ".ql-toolbar": {
                  backgroundColor: theme?.palette.mode === 'dark' ? "#fff" : ""
                }
              }}
            >
              <ReactQuill
                value={text}
                onChange={handleChange}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['link', 'image', 'video'],
                    ['clean'],
                  ],
                }}
                formats={[
                  'header',
                  'font',
                  'size',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'link',
                  'image',
                  'video',
                ]}
              />
            </StyledPaper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <LoadingButton
                onClick={handleSave}
                type="submit"
                color="primary"
                variant="contained"
                loading={isUpdating}
              >
                Save
              </LoadingButton>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
}
