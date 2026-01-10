import { Select as AntSelect } from 'antd';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const Select = ({
  id,
  data,
  label,
  defaultValue,
  margin = 'dense',
  errors,
  size = 'middle',
  disabled = false,
  control,
}) => {
  const [value, setValue] = useState(defaultValue);

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
          <AntSelect
            id={id}
            value={value}
            disabled={disabled}
            onChange={(newValue) => {
              const selectedItem = data.find(
                (item) => (item.id || item.name) === newValue,
              );
              setValue(selectedItem);
              field.onChange([selectedItem]);
            }}
            options={data.map((item) => ({
              label: item.name || ' ',
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
export default Select;
