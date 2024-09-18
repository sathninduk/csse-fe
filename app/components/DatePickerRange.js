import React from 'react';
import { DatePicker, Space, ConfigProvider } from 'antd';
const { RangePicker } = DatePicker;
import { AntdRegistry } from '@ant-design/nextjs-registry';
const DatePickerRange = (props) => (

  <AntdRegistry>
    < ConfigProvider
      theme={{
        token: {


          //change the color of the date picker
          colorPrimary: '#262323',
          borderRadius: 8,

        },
      }}
    >
      <Space direction="vertical" className='m-2' size={12}>
        <RangePicker
          name={props.name}
          className='h-12 '
        />
      </Space>
    </ConfigProvider>
  </AntdRegistry>
);
export default DatePickerRange;