import { Image } from 'react-native'
import { Skia, type SkImage } from '@shopify/react-native-skia'

const imgFactory = Skia.Image.MakeImageFromEncoded.bind(Skia.Image)

export const LINE_ORIGINAL_WIDTH = 3000
export const LINE_ORIGINAL_HEIGHT = 15
export const CARD_CORNER_ORIGINAL_SIZE = 180

const lineBottom = require('./line-bottom.png') as string
const lineTop = require('./line-top.png') as string
const lineLeft = require('./line-left.png') as string
const lineRight = require('./line-right.png') as string

const cardTopLeft = require('./card-top-left.png') as string
const cardTopRight = require('./card-top-right.png') as string
const cardBottomLeft = require('./card-bottom-left.png') as string
const cardBottomRight = require('./card-bottom-right.png') as string

export class SkiaImageCache {
  isCaching: boolean = false

  cachedImages?: {
    lineTop: SkImage
    lineBottom: SkImage
    lineLeft: SkImage
    lineRight: SkImage
    cardTopLeft: SkImage
    cardTopRight: SkImage
    cardBottomLeft: SkImage
    cardBottomRight: SkImage
  }

  static async cacheImage(source: string): Promise<SkImage> {
    const uri = typeof source === 'string' ? source : Image.resolveAssetSource(source).uri
    const data = await Skia.Data.fromURI(uri)
    const image = imgFactory(data)

    if (!image) {
      throw new Error('Failed to load image')
    }

    return image
  }

  async generateCache() {
    if (this.isCaching) {
      return
    }

    try {
      this.isCaching = true

      this.cachedImages = {
        lineTop: await SkiaImageCache.cacheImage(lineTop),
        lineBottom: await SkiaImageCache.cacheImage(lineBottom),
        lineLeft: await SkiaImageCache.cacheImage(lineLeft),
        lineRight: await SkiaImageCache.cacheImage(lineRight),
        cardTopLeft: await SkiaImageCache.cacheImage(cardTopLeft),
        cardTopRight: await SkiaImageCache.cacheImage(cardTopRight),
        cardBottomLeft: await SkiaImageCache.cacheImage(cardBottomLeft),
        cardBottomRight: await SkiaImageCache.cacheImage(cardBottomRight)
      }
    } catch (error) {
      console.error(error)
    }

    this.isCaching = false
  }
}

export const skiaImageCache = new SkiaImageCache()
