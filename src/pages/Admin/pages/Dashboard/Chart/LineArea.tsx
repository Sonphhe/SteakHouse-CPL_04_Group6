import * as React from 'react'
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'
import { useState, useEffect } from 'react'

export default function LineArea() {
  const { fetchTopSellingProducts } = useSteakHouseContext()
  const [uData, setUData] = useState<number[]>([])
  const [xLabels, setXLabels] = useState<string[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await fetchTopSellingProducts()
        const salesData = products.map((product) => product.totalPurchases) // Lấy giá trị `totalSales`
        const labels = products.map((product) => product.productName) // Lấy tên sản phẩm

        setUData(salesData)
        setXLabels(labels)
      } catch (error) {
        console.error('Error loading top selling products:', error)
      }
    }

    loadData()
  }, [fetchTopSellingProducts])

  return (
    <LineChart
      width={500}
      height={300}
      series={[{ data: uData, label: 'Total Sales', area: true, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: 'none'
        }
      }}
    />
  )
}
