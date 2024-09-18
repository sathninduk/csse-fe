import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export default function TimePick(props = { label: "Select Time" }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <DemoItem label={props.label}>
                    <MobileTimePicker name={props.name} defaultValue={dayjs('2022-04-17T15:30')} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}