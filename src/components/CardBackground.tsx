import React from 'react'
import { StyleSheet } from 'react-native'
import { Canvas, createPicture, Picture, Skia } from '@shopify/react-native-skia'

type TCardBackgroundProps = {
  width: number
  height: number
  tint?: string
  radius: number
}

export const CardBackground = function CardBackground({
  width,
  height
}: TCardBackgroundProps) {
  const picture = createPicture(
    canvas => {
      const paint = Skia.Paint()

      canvas.drawRect({
        x: 0,
        y: 0,
        width,
        height
      }, paint)
    }
  )

  return (
    <Canvas
      style={[
        style.container,
        {
          height,
          width
        }
      ]}
    >
     <Picture picture={picture} />
    </Canvas>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'teal',
    padding: 20
  }
})
