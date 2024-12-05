import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'

function ContainerQueries() {
  const { flashSales, products } = useSteakHouseContext()

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Typography variant='h4' align='center' color='red' sx={{ mb: 4, fontWeight: 'bold' }}>
        Flash Sales
      </Typography>
      <Grid container spacing={3}>
        {flashSales.map((sale) => {
          const product = products.find((prod) => Number(prod.id) === sale.productId)

          if (!product) return null

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sale.productId}>
              <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <Box
                  component='img'
                  src={product.image}
                  alt={product.productName}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                  }}
                />
                <Box sx={{ p: 2, flex: 1 }}>
                  <Typography variant='h6'>{product.productName}</Typography>
                  <Typography color='text.secondary'>{product.description}</Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      sx={{
                        textDecoration: 'line-through',
                        color: 'gray'
                      }}
                    >
                      ${product.productOldPrice}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'success.main',
                        fontWeight: 'bold'
                      }}
                    >
                      ${product.productPrice}
                    </Typography>
                  </Box>
                  <Typography color='primary'>
                    Sale: {sale.sale}% - Ends: {new Date(sale.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default ContainerQueries
