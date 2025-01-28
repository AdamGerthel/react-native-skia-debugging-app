import React, { memo, useMemo } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import {
  Canvas,
  Group,
  Skia,
  type SkSVG,
  fitbox,
  rect,
  BlendMode,
  ImageSVG
} from '@shopify/react-native-skia'

const svgString = `<svg width="128" height="128" viewBox="0 0 128 128" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        fill="#FFFFFF"
        d="M84.7777778,64.200627 L77.4777778,64.200627 C77.4777778,63.3981191 77.4777778,22.0689655 77.4777778,24.0752351 L77.4777778,24.0752351 C79.5055556,24.0752351 81.5333333,22.0689655 81.5333333,20.0626959 C81.5333333,17.6551724 79.5055556,15.6489028 77.0722222,15.6489028 L75.45,15.6489028 L80.7222222,0 L49.0888889,0 L54.3611111,15.2476489 L52.7388889,15.2476489 C50.3055556,15.2476489 48.2777778,17.2539185 48.2777778,19.661442 C48.2777778,22.0689655 49.9,23.6739812 52.3333333,23.6739812 L52.3333333,23.6739812 C52.3333333,24.0752351 52.3333333,65.4043887 52.3333333,63.799373 L44.2222222,63.799373 L28,107.937304 L40.1666667,128 L88.8333333,128 L101,107.937304 L84.7777778,64.200627 Z M53.5,114 C48.825,114 45,110.175 45,105.5 C45,100.825 48.825,97 53.5,97 C58.175,97 62,100.825 62,105.5 C62,110.175 58.175,114 53.5,114 Z M66.5,87 C64.4,87 63,85.25 63,83.5 C63,81.75 64.4,80 66.5,80 C68.25,80 70,81.75 70,83.5 C70,85.25 68.6,87 66.5,87 Z M76.5,121 C74.4,121 73,119.25 73,117.5 C73,115.75 74.4,114 76.5,114 C78.25,114 80,115.75 80,117.5 C80,119.25 78.6,121 76.5,121 Z"
      />
    </g>
  </svg>`

const svgIcon = Skia.SVG.MakeFromString(svgString)!!

const DEFAULT_FILL = '#FFF'


export type TIconProps = {
  height: number
  width: number
  fill?: string
  style?: StyleProp<ViewStyle>
}

export const Icon = memo(function Icon({
  fill = DEFAULT_FILL,
  style,
  height,
  width
}: TIconProps) {
  const paint = useMemo(() => Skia.Paint(), [])
  const src = useMemo(() => rect(0, 0, svgIcon.width(), svgIcon.height()), [])
  const dst = useMemo(() => rect(0, 0, width, height), [width, height])
  paint.setColorFilter(Skia.ColorFilter.MakeBlend(Skia.Color(fill), BlendMode.SrcIn))

  return (
    <Canvas
      style={[
        style,
        {
          width,
          height
        }
      ]}
    >
      <Group transform={fitbox('contain', src, dst)} layer={paint}>
        <ImageSVG svg={svgIcon} />
      </Group>
    </Canvas>
  )
})
