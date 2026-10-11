import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import RouterIcon from '@mui/icons-material/Router';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuth } from '../context/AuthContext';

// ── Stat card ─────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, change, positive, icon, color }: StatCardProps) => (
  <Card>
    <CardContent>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'center', mt: 0.5 }} spacing={0.5}>
            {positive ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
            )}
            <Typography variant="caption" color={positive ? 'success.main' : 'error.main'}>
              {change} vs. mes anterior
            </Typography>
          </Stack>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
      </Stack>
    </CardContent>
  </Card>
);

// ── Device status list ─────────────────────────────────────
const DEVICES = [
  { name: 'Router Principal', ip: '192.168.1.1', status: 'online' },
  { name: 'Switch Core', ip: '192.168.1.2', status: 'online' },
  { name: 'AP Oficina 1', ip: '192.168.1.10', status: 'warning' },
  { name: 'AP Oficina 2', ip: '192.168.1.11', status: 'offline' },
  { name: 'Firewall', ip: '10.0.0.1', status: 'online' },
];

const statusIcon = (s: string) => {
  if (s === 'online') return <CheckCircleIcon sx={{ color: 'success.main' }} />;
  if (s === 'warning') return <WarningAmberIcon sx={{ color: 'warning.main' }} />;
  return <ErrorIcon sx={{ color: 'error.main' }} />;
};

const statusLabel = (s: string) => {
  if (s === 'online') return { label: 'En línea', color: 'success' as const };
  if (s === 'warning') return { label: 'Advertencia', color: 'warning' as const };
  return { label: 'Desconectado', color: 'error' as const };
};

// ── Bandwidth chart (SVG simple bars) ─────────────────────
const BANDWIDTH_DATA = [45, 72, 58, 90, 65, 80, 55, 95, 70, 60, 85, 78];
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const BandwidthChart = () => {
  const max = Math.max(...BANDWIDTH_DATA);
  const H = 120;
  const barW = 24;
  const gap = 12;
  const totalW = BANDWIDTH_DATA.length * (barW + gap) - gap;

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <svg width={totalW} height={H + 24} style={{ display: 'block', margin: '0 auto' }}>
        {BANDWIDTH_DATA.map((v, i) => {
          const barH = (v / max) * H;
          const x = i * (barW + gap);
          const y = H - barH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} rx={4} fill="#1976d2" opacity={0.8} />
              <text x={x + barW / 2} y={H + 16} textAnchor="middle" fontSize={10} fill="#888">
                {MONTHS[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
};

// ── Network utilization ────────────────────────────────────
const UTILIZATION = [
  { label: 'Ancho de banda', value: 73 },
  { label: 'CPU Firewall', value: 41 },
  { label: 'Memoria Switch', value: 58 },
  { label: 'Latencia promedio', value: 22 },
];

// ── Dashboard Page ─────────────────────────────────────────
const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">
          Bienvenido, {user?.name?.split(' ')[0] ?? 'Usuario'} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Resumen general de tu red — {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stat cards */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Dispositivos activos"
            value="142"
            change="+8%"
            positive
            icon={<RouterIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Usuarios conectados"
            value="1,284"
            change="+12%"
            positive
            icon={<PeopleIcon />}
            color="#9c27b0"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Ancho de banda (Mbps)"
            value="8,470"
            change="-3%"
            positive={false}
            icon={<SpeedIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Alertas activas"
            value="7"
            change="-2 alertas"
            positive
            icon={<WarningAmberIcon />}
            color="#d32f2f"
          />
        </Grid>

        {/* Bandwidth chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Uso de ancho de banda (Mbps) — 2024
              </Typography>
              <BandwidthChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Network utilization */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Utilización de red
              </Typography>
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                {UTILIZATION.map(({ label, value }) => (
                  <Box key={label}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{label}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {value}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={value}
                      color={value > 80 ? 'error' : value > 60 ? 'warning' : 'primary'}
                      sx={{ borderRadius: 4, height: 8 }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Device status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado de dispositivos
              </Typography>
              <List disablePadding>
                {DEVICES.map((d, i) => (
                  <React.Fragment key={d.name}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'background.default', width: 36, height: 36 }}>
                          {statusIcon(d.status)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={d.name}
                        secondary={d.ip}
                        slotProps={{ primary: { style: { fontWeight: 500 } } }}
                      />
                      <Chip
                        label={statusLabel(d.status).label}
                        color={statusLabel(d.status).color}
                        size="small"
                        variant="outlined"
                      />
                    </ListItem>
                    {i < DEVICES.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actividad reciente
              </Typography>
              <List disablePadding>
                {[
                  { msg: 'AP Oficina 2 desconectado', time: 'hace 5 min', color: 'error.main' },
                  { msg: 'Nuevo dispositivo detectado en VLAN 10', time: 'hace 18 min', color: 'info.main' },
                  { msg: 'Regla de firewall actualizada', time: 'hace 42 min', color: 'success.main' },
                  { msg: 'Pico de tráfico en Switch Core', time: 'hace 1 h', color: 'warning.main' },
                  { msg: 'Certificado SSL renovado', time: 'hace 3 h', color: 'success.main' },
                ].map(({ msg, time, color }, i, arr) => (
                  <React.Fragment key={i}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'background.default', width: 36, height: 36 }}>
                          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={msg}
                        secondary={time}
                        slotProps={{
                          primary: { style: { fontWeight: 500, fontSize: '0.875rem' } },
                          secondary: { style: { fontSize: '0.75rem' } },
                        }}
                      />
                    </ListItem>
                    {i < arr.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
