import Grid from '@ui/common/Grid';
import CircularProgress from '@ui/common/CircularProgress';

const PageSpinner = ({ size, thickness }) => {
  return (
    <Grid container justifyContent="center">
      <CircularProgress
        size={size || 50}
        thickness={thickness || 5}
        style={{ color: '#2b6cb0' }}
      />
    </Grid>
  );
};

export default PageSpinner;
