import isWeekend from 'date-fns/isWeekend';
import 'dayjs/locale/es';
import { Controller } from 'react-hook-form';
import { DatePicker } from 'antd';

const DesktopDatePickerBasic = ({
  label,
  name,
  control,
  disabled,
  errors,
  readOnly,
  refs,
  isWeekends = true,
  defaultValue, // Nueva prop para el valor predeterminado
}) => {
  const disableWeekend = (date) => {
    if (isWeekends && isWeekend(date)) {
      return true;
    }
    return false;
  };

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
            value={field.value || defaultValue || null}
            disabled={disabled}
            onChange={(newValue) => {
              if (refs) refs(newValue);
              field.onChange(newValue);
            }}
            status={errors ? 'error' : undefined}
            style={{ width: '100%' }}
            inputReadOnly={readOnly}
            disabledDate={disableWeekend}
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

export default DesktopDatePickerBasic;
