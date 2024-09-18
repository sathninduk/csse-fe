import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MultiSelect = ({ items, selectedItems, onChange, placeholder,disable, size="middle", labelOutside }) => {
  const handleChange = (value) => {
    onChange(value); // Pass the selected value to the parent component
  };
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      {labelOutside && <label className='text-xs mt-2' >{placeholder}</label>}
      <Select
      className='mt-2'
        mode="multiple"
        size={size}
        placeholder={placeholder}
        defaultValue={selectedItems}
        value={selectedItems} // Use value instead of defaultValue
        onChange={handleChange} // Call handleChange function
        style={{ width: '100%' }}
        disabled={disable}
        
      >
        {items.map(item => (
          <Option key={item.id} value={item.name}>{item.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default MultiSelect;
