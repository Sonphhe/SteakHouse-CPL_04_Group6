import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Stack 
} from '@mui/material';
import { TrendingUp, Users, Package } from 'lucide-react';
import { green, orange } from '@mui/material/colors';

// Chart Imports
import BarAnimation from './Chart/BarAnimation';
import ContainerQueries from './Chart/ContainerQueries';
import LineArea from './Chart/LineArea';
import CustomAxis from './Chart/CustomAxis';
import BasicGauges from './Chart/BasicGauges';

// Context Hook
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext';

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  color 
}) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 3, 
      textAlign: 'center', 
      width: '100%' 
    }}
  >
    <Typography 
      variant="subtitle1" 
      color="text.secondary" 
      gutterBottom
    >
      {title}
    </Typography>
    
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="center" 
      spacing={1}
    >
      <Typography variant="h4" color="primary">
        {value}
      </Typography>
      
      <Stack 
        direction="row" 
        alignItems="center" 
        color={color}
      >
        <Icon size={16} />
        <Typography variant="body2" color="inherit">
          +{change}%
        </Typography>
      </Stack>
    </Stack>
    
    <Typography 
      variant="body2" 
      color="text.secondary"
    >
      vs. last week
    </Typography>
  </Paper>
);

const DashBoardDetails = () => {
  const { accountStatistics } = useSteakHouseContext();

  if (!accountStatistics) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" color="primary" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome to your analytics dashboard
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} justifyContent="center" mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            icon={TrendingUp}
            title="Total Accounts"
            value={accountStatistics.total}
            change={`+${accountStatistics.monthWithMostRegistrations.count} this month`}
            color={green[500]}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            icon={TrendingUp}
            title="Most Active Month"
            value={accountStatistics.monthWithMostRegistrations.month}
            change={`${accountStatistics.monthWithMostRegistrations.percentage}%`}
            color={orange[500]}
          />
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Revenue Analysis
            </Typography>
            <Box height={300}>
              <BarAnimation />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Trend Overview
            </Typography>
            <Box height={300}>
              <LineArea />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Performance Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Performance Metrics
            </Typography>
            <CustomAxis />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Goal Completion
            </Typography>
            <BasicGauges />
          </Paper>
        </Grid>
      </Grid>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                mb={2} 
                display="flex" 
                alignItems="center" 
                gap={1}
              >
                <Package size={20} />
                Featured Product
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <ContainerQueries />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashBoardDetails;