import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { skiaImageCache } from './src/assets/skia-images';
import { CardBackground } from './src/components/CardBackground';

const deviceWidth = Dimensions.get('window').width

export default function App() {
  const [cacheHasBeenGenerated, setCacheHasBeenGenerated] = useState(false)
  const [dimensions, setDimensions] = useState({
    width: 250,
    height: 250
  })

  useEffect(() => {
    if (!cacheHasBeenGenerated) {
      skiaImageCache.generateCache().then(() => {
        setCacheHasBeenGenerated(true)
      })
    }
  }, [cacheHasBeenGenerated])

  const resizeRandomly = () => {
    setDimensions({
      width: Math.min(Math.floor(Math.random() * 500) + 100, deviceWidth - 20),
      height: Math.min(Math.floor(Math.random() * 200) + 100, 300)
    })
  }

  return (
    <View style={styles.container}>
      {!cacheHasBeenGenerated && <Text>Caching images...</Text>}
      <StatusBar style="auto" />
      {cacheHasBeenGenerated && (
        <>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resizeRandomly} style={styles.button}><Text style={styles.buttonLabel}>Resize</Text></TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
      <CardBackground tint="#D77846" width={dimensions.width} height={dimensions.height} cornerSize={15} corners='all' />
      </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 80,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  buttonLabel: {
    color: 'white'
  },
  cardContainer: {
    marginTop: 20
  }
});
