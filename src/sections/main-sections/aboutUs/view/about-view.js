import { LoadingButton } from '@mui/lab';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingScreen } from 'src/components/loading-screen';
import { useGetContentQuery, useUpdateContentMutation } from 'src/store/Reducer/adminSetting';
import { enqueueSnackbar } from 'notistack';
import FaqsHero from 'src/sections/faqs/faqs-hero';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const DEFAULT_HTML = `<h1>About Us</h1>
<p>
  Welcome to <strong>Sign In Online</strong>, your trusted platform for seamless and secure access management.
  At Sign In Online, we are dedicated to simplifying your digital interactions by providing robust authentication solutions tailored to your needs.
</p>

<h2>Our Mission</h2>
<p>
  To empower businesses and individuals with reliable, user-friendly sign-in solutions that prioritize security and convenience.
</p>

<h2>Why Choose Us?</h2>
<ul>
  <li><strong>Security First:</strong> We employ cutting-edge security measures to safeguard your data.</li>
  <li><strong>Ease of Use:</strong> Our intuitive interface ensures a smooth sign-in experience.</li>
  <li><strong>Customizable Solutions:</strong> Tailor our services to fit your specific requirements.</li>
  <li><strong>24/7 Support:</strong> Our dedicated support team is here to assist you anytime, anywhere.</li>
</ul>

<h2>Get Started Today!</h2>
<p>
  Join thousands who trust Sign In Online for their authentication needs.
  Whether you're managing a small business or a large enterprise, we've got you covered.
</p>`;

export default function DashboardAboutUsView() {
  const theme = useTheme();
  const [text, setText] = useState('');

  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();
  const { data, isLoading } = useGetContentQuery('about-us');

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = async () => {
    if (!text) {
      return enqueueSnackbar('Please enter content', { variant: "error" });
    }

    try {
      const response = await updateContent({ title: 'about-us', html: text }).unwrap();
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
          <FaqsHero data={'About Us'} />

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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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
