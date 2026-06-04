import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, { RHFEditor, RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'react-redux';
// import { setUser } from '../../../store/slices/userSlice'


export default function ContactUsForm() {
    const dispatch = useDispatch();
    //   const [loginData] = useLoginMutation();
    const [errorMsg, setErrorMsg] = useState('');

    const ContactUsSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),
    });

    const defaultValues = {
        name: '',
        subject: '',
        message: '',
    };

    const methods = useForm({
        resolver: yupResolver(ContactUsSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (formData) => {
        // try {
        //   const { data } = await loginData(formData)
        //   console.log("data", data)
        //   if (data?.status === 200) {
        //     toast.success(data?.message)
        //     dispatch(setUser(data?.body));
        //     router.push(PATH_AFTER_ADMIN_LOGIN);
        //   } else {
        //     toast.error(data?.message || "Login failed");
        //   }
        //   // goTo(data?.body?.role);
        // } catch (error) {
        //   toast.error(error.message)
        //   console.error('error', error);
        //   toast.error(error.data?.message || error.message);
        //   reset();
        //   setErrorMsg(typeof error === 'string' ? error : error.message);
        // }
    });

    const renderHead = (
        <Stack spacing={2} sx={{ m: 5 }}>
            <Typography variant="h4" textAlign={'center'}>Contact Us</Typography>
        </Stack>
    );

    const renderForm = (
        <Stack spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <RHFTextField name="name" label="Name" />
            <RHFTextField name="subject" label="Subject" />
            <RHFEditor name="message" label="Message" />
            
            <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
            >
                Submit
            </LoadingButton>
        </Stack>
    );

    return (
        <Stack display='flex' justifyContent='center' alignItems={'center'}>
            <Stack sx={{
                width: {
                    xs: '90%',
                    lg: '50%',
                    md: '60%'
                }
            }}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    {renderHead}
                    {renderForm}
                </FormProvider>
            </Stack>
        </Stack>
    );
}