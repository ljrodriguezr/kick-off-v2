const FormControlLabel = ({ control, label, labelPlacement, ...rest }) => {
  const reverse = labelPlacement === 'start';
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexDirection: reverse ? 'row-reverse' : 'row',
      }}
      {...rest}
    >
      {control}
      <span>{label}</span>
    </label>
  );
};

export default FormControlLabel;
