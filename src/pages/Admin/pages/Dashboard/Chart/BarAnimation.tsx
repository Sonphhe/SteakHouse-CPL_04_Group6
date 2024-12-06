import * as React from 'react'
import { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'

interface ProductStats {
  productName: string
  totalPurchases: number
  totalReturns: number
}

export default function ProductBarChart() {
  const { fetchProductStatistics } = useSteakHouseContext()
  const [productStats, setProductStats] = useState<ProductStats[]>([])

  useEffect(() => {
    const getRandomItems = (array: ProductStats[], count: number) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

    const loadProductStats = async () => {
      const stats = await fetchProductStatistics()
      const randomStats = getRandomItems(stats, 3) // Lấy ngẫu nhiên 3 phần tử
      setProductStats(randomStats)
    }

    loadProductStats()
  }, [fetchProductStatistics])

  const props = {
    width: 500,
    height: 300,
    xAxis: [
      {
        data: productStats.map((stat) => stat.productName),
        scaleType: 'band' as const
      }
    ]
  }

  return (
    <BarChart
      {...props}
      series={[
        {
          data: productStats.map((stat) => stat.totalPurchases),
          label: 'Total Purchases'
        },
        {
          data: productStats.map((stat) => stat.totalReturns),
          label: 'Total Returns'
        }
      ]}
    />
  )
}
