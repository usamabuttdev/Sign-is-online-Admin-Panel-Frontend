import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/system';

import { useTheme } from '@mui/material/styles';
import { useGetPrivacyPolicyQuery, useUpdateSettingMutation } from 'src/store/Reducer/adminSetting';
import { LoadingScreen } from 'src/components/loading-screen';
import FaqsHero from 'src/sections/faqs/faqs-hero';
import { enqueueSnackbar } from 'notistack';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

export default function DashboardPrivacyView() {
  const theme = useTheme();
  const [text, setText] = useState('');

  // const [updateSetting, { isLoading: isUpdating }] = useUpdateSettingMutation();
  // const { data, isLoading } = useGetPrivacyPolicyQuery();
  let settingId = data?._id

  const handleChange = (value) => {
    setText(value);
  };


  const applyWhiteTextColor = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = doc.body.querySelectorAll("*");
    elements.forEach((el) => {
      el.style.color = "white";
    });
    return doc.body.innerHTML;
  };


  const handleSave = async () => {
    if (!text) {
      return enqueueSnackbar('Please enter content.', { variant: 'error' });
    }
    // const processedText = applyWhiteTextColor(text);
    try {
      const payload = {
        privacy_policy: text,
      };
      // const response = await updateSetting({ _id: settingId, data: payload }).unwrap();
      // if (!response.error) {
      //   enqueueSnackbar(response?.message || 'updated successfully', { variant: "success" });
      // }
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setText(data?.privacy_policy || '');
    }
  }, [data]);

  return (
    <>
      {/* {isLoading ? (
        <LoadingScreen />
      ) : ( */}
        <>
          <FaqsHero data={'Privacy & Policy'} />

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
                // loading={isUpdating}
              >
                Save
              </LoadingButton>
            </Box>
          </Stack>
        </>
      {/* )} */}
    </>
  );
}


const data = {
  
    privacy_policy: ` <h1>Privacy Policy</h1>
    <p>
      At <strong>Sign-In Online</strong>, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.
    </p>

    <h2>1. Information We Collect</h2>
    <ul>
      <li><strong>Personal Information:</strong> Such as name, email address, and contact details when you register or use our services.</li>
      <li><strong>Usage Data:</strong> Includes login times, IP addresses, browser types, and interaction with our site.</li>
      <li><strong>Cookies:</strong> To enhance your user experience and analyze traffic patterns.</li>
    </ul>

    <h2>2. How We Use Your Information</h2>
    <ul>
      <li>To provide and maintain our sign-in services.</li>
      <li>To communicate with you regarding your account or support needs.</li>
      <li>To improve our website functionality and security.</li>
      <li>To comply with legal obligations and protect our rights.</li>
    </ul>

    <h2>3. Data Security</h2>
    <p>
      We use industry-standard encryption and security practices to protect your personal data from unauthorized access, disclosure, or loss.
    </p>

    <h2>4. Third-Party Services</h2>
    <p>
      We may use trusted third-party tools (e.g., analytics, authentication services) that may collect information on our behalf, always under strict confidentiality agreements.
    </p>

    <h2>5. Your Rights</h2>
    <ul>
      <li>You can access, update, or delete your personal information at any time.</li>
      <li>You can opt-out of non-essential communications.</li>
    </ul>

    <h2>6. Changes to This Policy</h2>
    <p>
      We may update this policy from time to time. Changes will be posted on this page with a revised "Last Updated" date.
    </p>

    <p><strong>Last Updated:</strong> July 30, 2025</p>
    <p>
      If you have any questions about this policy, feel free to contact our support team at <a href="mailto:support@signinonline.com">support@signinonline.com</a>.
    </p>`
}