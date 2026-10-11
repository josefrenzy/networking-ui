import { Box, Typography } from '@mui/material';

const PlaceholderPage = ({ title }: { title: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <Typography variant="h5" color="text.secondary">
      {title} — próximamente
    </Typography>
  </Box>
);

export default PlaceholderPage;
