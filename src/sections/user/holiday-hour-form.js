import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Stack,
  Typography,
  FormLabel,
} from '@mui/material';

import * as Yup from 'yup';

import FormProvider, { RHFTextField, RHFSelect, RHFRadioGroup } from 'src/components/hook-form';
import RHFDate from 'src/components/hook-form/rhf-date';

// Helpers
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const ampm = ['AM', 'PM'];

const schema = Yup.object().shape({
  title: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  status: Yup.string().required('Required'),

  startHour: Yup.string().when('status', {
    is: 'open',
    then: (s) => s.required('Required'),
  }),
  startMinute: Yup.string().when('status', {
    is: 'open',
    then: (s) => s.required('Required'),
  }),
  startAmPm: Yup.string().when('status', {
    is: 'open',
    then: (s) => s.required('Required'),
  }),

  endHour: Yup.string().when('status', {
    is: 'open',
    then: (s) =>
      s.required('Required').test(
        'is-greater',
        'Close time must be greater than Start time',
        function (value) {
          const { startHour, startMinute, startAmPm, endHour, endMinute, endAmPm } = this.parent;

          if (!value || !startHour || !startMinute || !startAmPm || !endHour || !endMinute || !endAmPm) {
            return true;
          }

          // convert start to minutes
          let start = (parseInt(startHour, 10) % 12) * 60 + parseInt(startMinute, 10);
          if (startAmPm === 'PM') start += 12 * 60;

          // convert end to minutes
          let end = (parseInt(endHour, 10) % 12) * 60 + parseInt(endMinute, 10);
          if (endAmPm === 'PM') end += 12 * 60;

          return end > start;
        }
      ),
  }),
  endMinute: Yup.string().when('status', {
    is: 'open',
    then: (s) => s.required('Required'),
  }),
  endAmPm: Yup.string().when('status', {
    is: 'open',
    then: (s) => s.required('Required'),
  }),
});


const defaultValues = {
  title: '',
  date: new Date(),
  status: 'open', // default
  startHour: '',
  startMinute: '',
  startAmPm: '',
  endHour: '',
  endMinute: '',
  endAmPm: '',
};

export default function HolidayHourForm({ open, onClose, edit, selectedItem, onSave }) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { watch, reset } = methods;

  const status = watch('status'); // 👈 watch radio value

  useEffect(() => {
    if (selectedItem) {
      reset({
        ...selectedItem,
        date: new Date(selectedItem.date),
      });
    } else {
      reset(defaultValues);
    }
  }, [selectedItem, reset]);

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogTitle>{edit ? 'Edit Holiday Hours' : 'Add Holiday Hours'}</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ pt: 1 }}>
            {/* Holiday Title */}
            <RHFTextField name="title" label="Holiday Title" />

            {/* Date */}
            <RHFDate name="date" label="Date" />
           
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight="bold">
                Status
              </Typography>
              <RHFRadioGroup
                name="status"
                row
                spacing={2}
                options={[
                  { value: 'open', label: 'Open' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
            </Stack>

            {/* Start Time */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight="bold">
                Open Time
              </Typography>
              <Stack direction="row" spacing={2}>
                <RHFSelect name="startHour" label="Hour" sx={{ flex: 1 }} disabled={status === 'closed'}>
                  {hours.map((h) => (
                    <MenuItem key={h} value={h}>
                      {h}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFSelect name="startMinute" label="Minute" sx={{ flex: 1 }} disabled={status === 'closed'}>
                  {minutes.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFSelect name="startAmPm" label="AM/PM" sx={{ flex: 1 }} disabled={status === 'closed'}>
                  {ampm.map((ap) => (
                    <MenuItem key={ap} value={ap}>
                      {ap}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
            </Stack>

            {/* End Time */}
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight="bold">
                Close Time
              </Typography>
              <Stack direction="row" spacing={2}>
                <RHFSelect name="endHour" label="Hour" sx={{ flex: 1 }} disabled={status === 'closed'}>
                  {hours.map((h) => (
                    <MenuItem key={h} value={h}>
                      {h}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFSelect name="endMinute" label="Minute" sx={{ flex: 1 }} disabled={status === 'closed'}>
                  {minutes.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFSelect name="endAmPm" label="AM/PM" sx={{ flex: 1 }} disabled={status === 'closed'}>
                  {ampm.map((ap) => (
                    <MenuItem key={ap} value={ap}>
                      {ap}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
            </Stack>

         
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {edit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
