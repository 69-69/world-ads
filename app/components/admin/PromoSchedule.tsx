'use client';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState, useCallback } from "react";

type PromoScheduleProps = {
    errors: Record<string, string>;
    onScheduleChange?: (data: { start: string; end: string }) => void;
};

export default function PromoSchedule({ errors, onScheduleChange }: PromoScheduleProps) {
    const [startDateTime, setStartDateTime] = useState<Dayjs | null>(dayjs());
    const [endDateTime, setEndDateTime] = useState<Dayjs | null>(dayjs().add(1, 'hour'));
    const [validationErrors, setValidationErrors] = useState<{ start?: string; end?: string }>({});

    // Memoize the validateTimes function
    const validateTimes = useCallback(() => {
        const errors: { start?: string; end?: string } = {};

        if (!startDateTime || !endDateTime) return;

        if (startDateTime.isAfter(endDateTime)) {
            errors.end = 'End date must be after start date';
        }

        if (startDateTime.isBefore(dayjs())) {
            errors.start = 'Start date cannot be in the past';
        }

        setValidationErrors(errors);
    }, [startDateTime, endDateTime]);

    useEffect(() => {
        validateTimes();

        if (
            startDateTime &&
            endDateTime &&
            startDateTime.isBefore(endDateTime) &&
            onScheduleChange
        ) {
            onScheduleChange({
                start: startDateTime.toISOString(),
                end: endDateTime.toISOString(),
            });
        }
    }, [startDateTime, endDateTime, onScheduleChange, validateTimes]);  // Add the missing dependencies here

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column' },
                    gap: 2,
                }}
            >
                <DateTimePicker
                    label="Start Date"
                    name="start_at"
                    value={startDateTime}
                    onChange={(newValue) => setStartDateTime(newValue)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            fullWidth: true,
                            error: Boolean(validationErrors.start || errors.start_date),
                            helperText: validationErrors.start || errors.start_date || '',
                        },
                    }}
                />
                <DateTimePicker
                    label="End Date"
                    name="end_at"
                    value={endDateTime}
                    onChange={(newValue) => setEndDateTime(newValue)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            fullWidth: true,
                            error: Boolean(validationErrors.end || errors.end_date),
                            helperText: validationErrors.end || errors.end_date || '',
                        },
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
}
