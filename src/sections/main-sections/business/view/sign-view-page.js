import { Box, Card, Container, Divider, Grid, MenuItem, Paper, Slider, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFSelect, RHFTextField, RHFUpload } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledProgressBar } from 'src/components/progress-bar';

const defaultValues = {
    text: '',
    fontStyle: '',
    backgroundImage: null,
    textColor: '',
    backgroundColor: '',
    brightness: 0,
}

const SignViewPage = () => {
    const settings = useSettingsContext();
    const schema = Yup.object().shape({
        text: Yup.string().required('Message Text is required'),
        fontStyle: Yup.string().required('Font Style is required'),
        backgroundImage: Yup.mixed().nullable().required('Background Image is required'),
        textColor: Yup.string().required('Text Color is required'),
        backgroundColor: Yup.string().required('Background Color is required'),
        brightness: Yup.number().min(0).max(100).required('Brightness is required'),
    });
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });
    const onSubmit = (data) => {
        console.log(data);
    }
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            methods.setValue('backgroundImage', newFile);
        }
    }, [methods]);

    const handleColorChange = useCallback((event, colorType) => {
        methods.setValue(colorType, event);
    }, [methods]);

    const colors = [
        '#baf3db', '#f8e6a0', '#fedec8', '#ffd5d2', '#dfd8fd',
        '#4bce97', '#f5cd47', '#fea362', '#f87168', '#9f8fef',
        '#1f845a', '#946f00', '#c25100', '#ae2e24', '#6e5dc6',
        '#cce0ff', '#c6edfb', '#d3f1a7', '#fdd0ec', '#dcdfe4',
        '#579dff', '#6cc3e0', '#94c748', '#e774bb', '#8590a2',
        '#0c66e4', '#227d9b', '#5b7f24', '#ae4787', '#626f86'
    ];

    return (
        <div>
            <Container maxWidth={settings.themeStretch ? false : "lg"}>
                <CustomBreadcrumbs
                    heading={'Associated Sign'}
                    links={[
                        { name: 'Dashboard', href: '/dashboard' },
                        { name: 'Business', href: '/dashboard/business' },
                        { name: 'Associated Sign' }
                    ]}
                    sx={{ mb: 2 }}
                />
                <Card sx={{ p: { md: 3, xs: 1 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
                                    <RHFUpload
                                        name="backgroundImage"
                                        thumbnail
                                        onDrop={onDrop}

                                    />
                                    <RHFTextField
                                        name="text"
                                        label="Message Text"
                                        fullWidth
                                    />
                                    <RHFSelect
                                        name="fontStyle"
                                        label="Font Style"
                                        fullWidth
                                    >
                                        <MenuItem value="">Select Font Style</MenuItem>
                                        <Divider sx={{ borderStyle: 'dashed' }} />
                                        {['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'].map((font) => (
                                            <MenuItem key={font} value={font}>{font}</MenuItem>
                                        ))}
                                    </RHFSelect>
                                    <Box sx={{ mb: 1 }}>Select Text color</Box>
                                    <Box sx={{ width: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {colors.map((row, rowIndex) => (
                                            <Paper
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    backgroundColor: row,
                                                    cursor: 'pointer',
                                                    border: methods.watch("textColor") === row ? '2px solid black' : 'none'
                                                }}
                                                onClick={() => handleColorChange(row, "textColor")}
                                            />
                                        ))}
                                    </Box>
                                    <Box sx={{ mb: 1 }}>Background color</Box>
                                    <Box sx={{ width: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {colors.map((row, rowIndex) => (
                                            <Paper
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    backgroundColor: row,
                                                    cursor: 'pointer',
                                                    border: methods.watch("backgroundColor") === row ? '2px solid black' : 'none'
                                                }}
                                                onClick={() => handleColorChange(row, "backgroundColor")}
                                            />
                                        ))}
                                    </Box>
                                    <Box>Select Brightness</Box>
                                    <Slider
                                        name="brightness"
                                        value={methods.watch("brightness") || 0}
                                        onChange={(e, value) => methods.setValue('brightness', value)}
                                        min={0}
                                        max={100}
                                        step={1}
                                        valueLabelDisplay="auto"
                                        sx={{ width: '100%' }}
                                    />

                                </Box>
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ p: 2, textAlign: 'center' }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Preview
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 300,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        backgroundColor: methods.watch('backgroundColor') || '#ffffff',
                                        backgroundImage: methods.watch('backgroundImage')?.preview
                                            ? `url(${methods.watch('backgroundImage').preview})`
                                            : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        filter: `brightness(${methods.watch('brightness') || 100}%)`,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: methods.watch('textColor') || '#000000',
                                            fontFamily: methods.watch('fontStyle') || 'inherit',
                                            fontSize: '24px',
                                            textAlign: 'center',
                                            px: 2,
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {methods.watch('text') || 'Your message will appear here'}
                                    </Typography>
                                </Box>

                            </Paper>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </div>
    )
}

export default SignViewPage