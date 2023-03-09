import { View, Text } from 'react-native'
import React from 'react'
import BackgroundGradient from '../../../hoc/BackgroundGradient'

const Summary = () => {
  return (
    <BackgroundGradient
      marginHorizontal={30}
      justifyContent={"center"}
      flex={1}
    >
<Text style={{color: 'white', fontFamily: 'Open-Sans-Bold', fontSize: 20, marginBottom: 15}}>Ilość nawyków: </Text>
<Text style={{color: 'white', fontFamily: 'Open-Sans-Bold', fontSize: 20, marginBottom: 15}}>Suma przychodów: </Text>
<Text style={{color: 'white', fontFamily: 'Open-Sans-Bold', fontSize: 20, marginBottom: 15}}>Suma rozchodów: </Text>
<Text style={{color: 'white', fontFamily: 'Open-Sans-Bold', fontSize: 20, marginBottom: 15}}>Bilans finansowy: </Text>
</BackgroundGradient>
  )
}

export default Summary