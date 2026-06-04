import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useLocales } from 'src/locales';


// ----------------------------------------------------------------------

export default function SuccessDialog({ title, content, action, open, showButton = true, onClose, ...other }) {
    const { t } = useLocales();

    const theme = useTheme();

    const PRIMARY_DARK = theme.palette.primary.dark;

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>

            <Box
                sx={{
                    pt: 1,
                    width: '100%',
                    display: 'flex',
                    margin: "auto",
                    marginTop: "20px",
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                }}
            >
                <Iconify color={PRIMARY_DARK} icon="mage:message-dots" width={36} />
                <DialogTitle sx={{ px: 1, py: 1, textAlign: 'center' }}>{title}</DialogTitle>
            </Box>


            {content && <DialogContent sx={{ py: 1, typography: 'body2', textAlign: 'center' }}> {content} </DialogContent>}

            <DialogActions sx={{ py: 1, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {action}

                {showButton && (
                    <>
                        <Button variant="outlined" color="inherit" onClick={onClose}>
                            {t('success_modal_close_button')}
                        </Button>
                    </>
                )}

            </DialogActions>
        </Dialog >
    );
}

SuccessDialog.propTypes = {
    action: PropTypes.node,
    content: PropTypes.node,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string,
};
