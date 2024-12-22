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
  tint = '#CCCCCC',
  radius = 25,
  width,
  height
}: TCardBackgroundProps) {
  const picture = createPicture(
    canvas => {
      const paint = Skia.Paint()

      const rrct = {
        rect: {
          x: 0,
          y: 0,
          width: width,
          height: height
        },
        topLeft: { x: radius, y: radius },
        topRight: { x: radius, y: radius },
        bottomRight: {
          x: radius,
          y: radius
        },
        bottomLeft: {
          x: radius,
          y: radius
        }
      }

      canvas.drawRRect(rrct, paint)
    },
    {
      width,
      height
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
      {picture && <Picture picture={picture} />}
    </Canvas>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: 'teal',
    padding: 20
  }
})
