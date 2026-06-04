import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/system';

import { useTheme } from '@mui/material/styles';
import {  useGetTermsConditionsQuery, useUpdateSettingMutation } from 'src/store/Reducer/adminSetting';
import { LoadingScreen } from 'src/components/loading-screen';
import FaqsHero from 'src/sections/faqs/faqs-hero';
import { enqueueSnackbar } from 'notistack';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

export default function DashboardTacView() {
  const theme = useTheme();
  const [text, setText] = useState('');

  const [updateSetting, { isLoading: isUpdating }] = useUpdateSettingMutation();
  const { data, isLoading } = useGetTermsConditionsQuery();
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
      return  enqueueSnackbar('Please enter content.', { variant: 'error' });
    }
    // const processedText = applyWhiteTextColor(text);
    try {
      const payload = {
        terms_and_conditions: text,
      };
      const response = await updateSetting({ _id: settingId, data: payload }).unwrap();
      if (!response.error) {
        enqueueSnackbar(response?.message || 'updated successfully', { variant: "success" });
      } 
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setText(data?.terms_and_conditions || '');
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
