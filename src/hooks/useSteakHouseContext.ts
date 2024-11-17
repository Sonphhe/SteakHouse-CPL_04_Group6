import { useContext } from "react"
import { SteakHouseContext } from "../context/SteakHouseContext"

export const useSteakHouseContext = () => {
    const context = useContext(SteakHouseContext)
    if (!context) {
      throw new Error('useSteakHouseContext must be used within a SteakHouseProvider')
    }
    return context
  }