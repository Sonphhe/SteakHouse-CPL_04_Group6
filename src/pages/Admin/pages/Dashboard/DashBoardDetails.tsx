import React from 'react'
import { Box, Container, Typography, Grid, Paper, Stack } from '@mui/material'
import { TrendingUp, Users, Package } from 'lucide-react'
import { green, orange } from '@mui/material/colors'

// Chart Imports
import BarAnimation from './Chart/BarAnimation'
import ContainerQueries from './Chart/ContainerQueries'
import LineArea from './Chart/LineArea'

// Context Hook
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'

interface StatCardProps {
  icon: React.ComponentType<any>
  title: string
  value: string | number
  change: string
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change, color }) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      textAlign: 'center',
      width: '100%'
    }}
  >
    <Typography variant='h5' color='text.primary' sx={{ fontWeight: 'bold' }} gutterBottom>
      {title}
    </Typography>

    <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
      <Typography variant='h4' color='primary'>
        {value}
      </Typography>

      <Stack direction='row' alignItems='center' color={color}>
        <Icon size={16} />
        <Typography variant='body2' color='inherit'>
          +{change}%
        </Typography>
      </Stack>
    </Stack>

    <Typography variant='body2' color='text.secondary'>
      vs. last month
    </Typography>
  </Paper>
)

const DashBoardDetails = () => {
  const { accountStatistics } = useSteakHouseContext()
  const { products } = useSteakHouseContext()
  // if (!accountStatistics) {
  //   return <Typography>Loading...</Typography>;
  // }

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign='center' mb={4}>
        <Typography variant='h3' color='primary' gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          Welcome to your analytics dashboard
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} justifyContent='center' mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={TrendingUp}
            title='Total Accounts'
            value={accountStatistics?.total ?? 0}
            change={`+${accountStatistics?.monthWithMostRegistrations?.count ?? 0} this month`}
            color={green[500]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard icon={TrendingUp} title='Total Product' value={products.length} change='N/A' color={orange[500]} />
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant='h6' mb={2}>
              Analysis Product
            </Typography>
            <Box height={300}>
              <BarAnimation />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant='h6' mb={2}>
              Trend Product
            </Typography>
            <Box height={300}>
              <LineArea />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Products Grid */}
      <ContainerQueries />
    </Container>
  )
}

export default DashBoardDetails
