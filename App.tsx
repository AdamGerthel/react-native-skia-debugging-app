import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from './src/components/Icon'

export default function App() {
  const [showIcon, setShowIcon] = useState(true)

  const toggleShowIcon = () => {
    setShowIcon(!showIcon)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleShowIcon} style={styles.button}>
          <Text style={styles.buttonLabel}>{showIcon ? 'Hide icon' : 'Show icon'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {showIcon && <Icon width={50} height={50} fill='#0271EF' />}
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
    backgroundColor: 'gray',
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
