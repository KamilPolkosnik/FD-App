import { View, Text } from 'react-native'
import React from 'react'
import BackgroundGradient from '../hoc/BackgroundGradient'

const Dashboard = () => {
  return (
    <BackgroundGradient>
      <Text style={{color: 'white'}}>Dashboard</Text>
    </BackgroundGradient>
  )
}

export default Dashboard