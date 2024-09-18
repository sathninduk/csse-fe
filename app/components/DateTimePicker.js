import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



export default function DateTimePickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateTimePicker',
          'MobileDateTimePicker',
          'DesktopDateTimePicker',
          'StaticDateTimePicker',
        ]}
      >
        <DemoItem label={props.HeaderName}>
          <DateTimePicker
            label={props.label}
            name={props.name}
            defaultValue={dayjs()}
            className='w-fit'
            disableFuture={props.disableFuture}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}