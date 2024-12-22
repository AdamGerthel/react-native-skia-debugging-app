import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { CardBackground } from './src/components/CardBackground'

const deviceWidth = Dimensions.get('window').width

export default function App() {
  const [dimensions, setDimensions] = useState({
    width: 250,
    height: 250
  })

  const resizeRandomly = () => {
    setDimensions({
      width: Math.floor(Math.min(Math.random() * 200 + 100, deviceWidth - 20)),
      height: Math.floor(Math.min(Math.random() * 200 + 100, 300))
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resizeRandomly} style={styles.button}>
          <Text style={styles.buttonLabel}>Resize</Text>
        </TouchableOpacity>
        <Text>
          Canvas size: {dimensions.width}x{dimensions.height}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <CardBackground
          tint="#D77846"
          width={dimensions.width}
          height={dimensions.height}
          radius={25}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    top: 80,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center'
  },
  cardContainer: {
    marginTop: 20
  }
})
