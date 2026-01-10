import 'dayjs/locale/es';
import { Controller } from 'react-hook-form';
import { TimePicker } from 'antd';

const TimePickerBasic = ({ label, name, control, errors, refs }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
            {label}
          </label>
          <TimePicker
            {...field}
            format="HH:mm"
            value={field.value || null}
            onChange={(newValue) => {
              if (refs) refs(newValue);
              field.onChange(newValue);
            }}
            status={errors ? 'error' : undefined}
            style={{ width: '100%' }}
          />
          {errors?.message && (
            <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
              {errors.message}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default TimePickerBasic;
