import { Select } from 'antd';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const MultipleSelect = ({
  id,
  data,
  label,
  defaultValue = [],
  size = 'middle',
  margin = 'dense',
  errors,
  disabled = false,
  control,
}) => {
  const fixedOptions = [];
  const [value, setValue] = useState([...defaultValue]);

  return (
    <div style={{ marginTop: margin === 'dense' ? 8 : 16, minWidth: 100 }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            marginBottom: 4,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            id={id}
            mode="multiple"
            disabled={disabled}
            value={value}
            onChange={(newValue) => {
              const selectedValues = [
                ...fixedOptions,
                ...newValue.filter(
                  (option) => fixedOptions.indexOf(option) === -1,
                ),
              ];
              setValue(selectedValues);
              field.onChange(selectedValues);
            }}
            options={data.map((item) => ({
              label: item.name,
              value: item.id || item.name,
            }))}
            size={size}
            style={{ width: '100%' }}
            status={errors ? 'error' : ''}
            placeholder={`Seleccionar ${label || ''}`}
          />
        )}
      />
      {errors && (
        <div style={{ color: '#ff4d4f', fontSize: 14, marginTop: 4 }}>
          {errors}
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
