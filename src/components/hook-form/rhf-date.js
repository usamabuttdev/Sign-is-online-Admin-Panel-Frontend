import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';

const RHFDate = ({ name, ...other }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <DesktopDatePicker
                    label={other.label || 'Date'}
                    value={field.value || null}
                    onChange={field.onChange}
                    slotProps={{
                        textField: {
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                            fullWidth: true,
                        },
                    }}
                    {...other}
                />
            )}
        />
    )
}

export default RHFDate
