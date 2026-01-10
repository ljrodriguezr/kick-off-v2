import isWeekend from 'date-fns/isWeekend';
import 'dayjs/locale/es';
import { Controller } from 'react-hook-form';
import { DatePicker } from 'antd';

const BasicDateTimePicker = ({
  label,
  name,
  control,
  disabled,
  errors,
  readOnly,
  refs,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
            {label}
          </label>
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm:ss"
            value={field.value || null}
            disabled={disabled}
            onChange={(newValue) => {
              if (refs) refs(newValue);
              field.onChange(newValue);
            }}
            status={errors ? 'error' : undefined}
            style={{ width: '100%' }}
            inputReadOnly={readOnly}
            disabledDate={isWeekend}
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

export default BasicDateTimePicker;
