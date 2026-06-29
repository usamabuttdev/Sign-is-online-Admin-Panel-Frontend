import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Iconify from 'src/components/iconify';
import { Button, Tooltip } from '@mui/material';
import { formatDate } from 'src/utils/format-time';
import Label from 'src/components/label';
import { RouterLink } from 'src/routes/components';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

export default function ProfileHome({ info }) {
  const {full , display} = formatDate(info?.created_at)
  const formattedAmount = info?.amount != null
    ? `$${Number(info.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$0.00';
  const COLORS = {
    Attempted:"warning",
    Successful:"success",
    Refunded:"info"
  }
  const confirm = useBoolean()

  const renderAbout = (
       <Card>
         <CardHeader
            title="TK2383479"
            action={
              info?.status === "Successful" && (
                <>
            <Tooltip title="Refund this charge" placement="top" arrow >
                <Button
                component={RouterLink}
                variant="contained"
                startIcon={<Iconify icon="mingcute:card-refund-fill" />}
                onClick={confirm.onTrue}
              >
                Refund
              </Button>
            </Tooltip>
                </>
              )
            }
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          />
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* Transaction Info */}
        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:account-cash" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {`Account: `}
            <Link variant="subtitle2" color="inherit">
              {info?.account}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="mdi:currency-usd" width={24} sx={{ mr: 2 }} />
          {`Amount: ${formattedAmount}`}
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="mdi:credit-card-outline" width={24} sx={{ mr: 2 }} />
          {`Method: ${info?.method}`}
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="mdi:calendar" width={24} sx={{ mr: 2 }} />
           Status:
          <Label variant="soft" color={COLORS[info?.status]} sx={{ml:1}}>
             {info?.status}
          </Label>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="mdi:calendar" width={24} sx={{ mr: 2 }} />
          <Tooltip title={full}>
           {`Created : ${display}`}
          </Tooltip>
        </Stack>

      </Stack>
    </Card>
  );

  return (
    <>
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>{renderAbout}</Stack>
      </Grid>
    </Grid>
    <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Refund Charge"
        content="Are you sure to refund the charge?"
        action={
            <Button variant="contained"  onClick={confirm.onFalse}>
              Refund
            </Button>
        }
      />
    </>

  );
}


ProfileHome.propTypes = {
  info: PropTypes.object
};
