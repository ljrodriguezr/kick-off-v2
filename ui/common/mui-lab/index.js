import { Select } from 'antd';
import Alert from './Alert';
import AlertTitle from './AlertTitle';

const getOptionValue = (option) => {
  if (!option) return '';
  return option.code ?? option.value ?? option.id ?? option.name ?? '';
};

const Autocomplete = ({
  options = [],
  getOptionLabel,
  onChange,
  defaultValue,
  disableClearable,
  fullWidth,
  disabled,
  loading,
  renderInput,
  ...rest
}) => {
  const placeholder = (() => {
    if (!renderInput) return undefined;
    const rendered = renderInput({});
    return rendered?.props?.label;
  })();

  const selectedValue = defaultValue ? getOptionValue(defaultValue) : undefined;

  return (
    <Select
      showSearch
      allowClear={!disableClearable}
      disabled={disabled}
      loading={loading}
      placeholder={placeholder}
      style={fullWidth ? { width: '100%' } : undefined}
      defaultValue={selectedValue}
      optionFilterProp="label"
      onChange={(value) => {
        const option = options.find((item) => getOptionValue(item) === value);
        if (onChange) onChange(null, option || null);
      }}
      options={options.map((option) => ({
        value: getOptionValue(option),
        label: getOptionLabel ? getOptionLabel(option) : option?.name || '',
      }))}
      {...rest}
    />
  );
};

export { Autocomplete, Alert, AlertTitle };
