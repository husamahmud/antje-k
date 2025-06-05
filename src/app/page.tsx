import { join } from 'node:path'
import { readdirSync } from 'node:fs'

import { Transition } from '@/components/transition'
import { Slider } from '@/components/slider'

type ImageData = {
  src: string
  name: string
  size: [number, number, number]
  type: string
}

// Server-side data fetching
async function getImages(): Promise<ImageData[]> {
  const imagesDir = join(process.cwd(), 'public', 'images')
  const files = readdirSync(imagesDir).filter(
    (file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  )

  const images: ImageData[] = files
    .map((file) => {
      const [, name, type, sizeStr] = file.replace(/\.(png|jpg|jpeg)$/, '').split('_')
      const [width, height, depth] = sizeStr.split(',').map((num) => Number.parseFloat(num))
      return {
        src: `/images/${file}`,
        name,
        size: [width, height, depth] as [number, number, number],
        type,
      }
    })
    .sort((a, b) => {
      const indexA = Number.parseInt(a.src.split('/').pop()?.split('_')[0] || '0')
      const indexB = Number.parseInt(b.src.split('/').pop()?.split('_')[0] || '0')
      return indexA - indexB
    })

  return images
}

export default async function Home() {
  const images = await getImages()

  return (
    <Transition className="flex flex-1 flex-col items-center justify-center">
      <Slider images={images} />
    </Transition>
  )
}
