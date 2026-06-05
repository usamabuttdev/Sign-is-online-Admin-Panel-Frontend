import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Stack,
    Typography,
  } from '@mui/material';
  import { useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
  import * as Yup from 'yup';
  
  import FormProvider, { RHFSelect } from 'src/components/hook-form';
  import React from 'react';
  
  // ----------------------------------------------------------------------
  
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const ampm = ['AM', 'PM'];
  
  const defaultValues = {
    day: '',
    startHour: '',
    startMinute: '',
    startAmPm: 'AM',
    endHour: '',
    endMinute: '',
    endAmPm: 'PM',
    status: 'Open',
  };
  
  const schema = Yup.object().shape({
    day: Yup.string().required('Required'),
  
    startHour: Yup.string().required('Required'),
    startMinute: Yup.string().required('Required'),
    startAmPm: Yup.string().required('Required'),
  
    endHour: Yup.string()
      .required('Required')
      .test(
        'is-greater',
        'Close time must be greater than Start time',
        function (value) {
          const { startHour, startMinute, startAmPm, endHour, endMinute, endAmPm } = this.parent;
  
          if (!value || !startHour || !startMinute || !startAmPm || !endHour || !endMinute || !endAmPm) {
            return true; // skip until all fields are filled
          }
  
          // convert start time to minutes
          let start = (parseInt(startHour, 10) % 12) * 60 + parseInt(startMinute, 10);
          if (startAmPm === 'PM') start += 12 * 60;
  
          // convert end time to minutes
          let end = (parseInt(endHour, 10) % 12) * 60 + parseInt(endMinute, 10);
          if (endAmPm === 'PM') end += 12 * 60;
  
          return end > start;
        }
      ),
  
    endMinute: Yup.string().required('Required'),
    endAmPm: Yup.string().required('Required'),
  });
  
  
  export default function RegularHourForm({ open, onClose, onSubmit, isEdit, currentRow }) {
    const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues,
    });
  
    const { reset, handleSubmit } = methods;
  
    // Prefill on edit
    React.useEffect(() => {
      if (isEdit && currentRow) {
        const [startHour, startMinuteAmPm] = currentRow.startTime.split(':');
        const [startMinute, startAmPm] = [
          startMinuteAmPm.slice(0, 2),
          startMinuteAmPm.slice(2),
        ];
  
        const [endHour, endMinuteAmPm] = currentRow.endTime.split(':');
        const [endMinute, endAmPm] = [endMinuteAmPm.slice(0, 2), endMinuteAmPm.slice(2)];
  
        reset({
          day: currentRow.day,
          startHour,
          startMinute,
          startAmPm,
          endHour,
          endMinute,
          endAmPm,
          status: currentRow.status,
        });
      } else {
        reset(defaultValues);
      }
    }, [isEdit, currentRow, reset]);
  
    const submitHandler = (data) => {
      const startTime = `${data.startHour}:${data.startMinute}${data.startAmPm}`;
      const endTime = `${data.endHour}:${data.endMinute}${data.endAmPm}`;
      onSubmit({ ...data, startTime, endTime });
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? 'Edit Regular Hours' : 'Add Regular Hours'}</DialogTitle>
  
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {/* Day */}
              <RHFSelect name="day" label="Day">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                  (day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  )
                )}
              </RHFSelect>
  
              {/* Start Time */}
              <Typography variant="subtitle2" fontWeight="bold">
                Open Time
              </Typography>
              <Stack direction="row" spacing={1}>
                <RHFSelect name="startHour" label="Hour" sx={{ flex: 1 }}>
                  {hours.map((h) => (
                    <MenuItem key={h} value={h}>
                      {h}
                    </MenuItem>
                  ))}
                </RHFSelect>
  
                <RHFSelect name="startMinute" label="Minute" sx={{ flex: 1 }}>
                  {minutes.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </RHFSelect>
  
                <RHFSelect name="startAmPm" label="AM/PM" sx={{ flex: 1 }}>
                  {ampm.map((ap) => (
                    <MenuItem key={ap} value={ap}>
                      {ap}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
  
              {/* End Time */}
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2 }}>
                Close Time
              </Typography>
              <Stack direction="row" spacing={1}>
                <RHFSelect name="endHour" label="Hour" sx={{ flex: 1 }}>
                  {hours.map((h) => (
                    <MenuItem key={h} value={h}>
                      {h}
                    </MenuItem>
                  ))}
                </RHFSelect>
  
                <RHFSelect name="endMinute" label="Minute" sx={{ flex: 1 }}>
                  {minutes.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </RHFSelect>
  
                <RHFSelect name="endAmPm" label="AM/PM" sx={{ flex: 1 }}>
                  {ampm.map((ap) => (
                    <MenuItem key={ap} value={ap}>
                      {ap}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>

            </Stack>
          </DialogContent>
  
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    );
  }
  