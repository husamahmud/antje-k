import { join } from 'node:path'
import { readdirSync } from 'node:fs'
import ImageGallery from '../../components/Imagegallery'

type ImageData = {
  id: number
  src: string
  name: string
  size: [number, number, number]
}

// Server-side data fetching
async function getImages(): Promise<ImageData[]> {
  const imagesDir = join(process.cwd(), 'public', 'images')
  const files = readdirSync(imagesDir).filter(
    (file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  )

  const images: ImageData[] = files
    .map((file, index) => {
      const [, name, , sizeStr] = file.replace(/\.(png|jpg|jpeg)$/, '').split('_')
      const [width, height, depth] = sizeStr.split(',').map((num) => Number.parseFloat(num))
      return {
        id: index + 1,
        src: `/images/${file}`,
        name: name.replace(/[-_]/g, ' '),
        size: [width, height, depth] as [number, number, number],
      }
    })

  return images
}

const Page = async () => {
  const images = await getImages()

  return (
    <ImageGallery
      images={images.map((image) => ({
        id: image.id,
        src: image.src,
        alt: image.name,
        description: image.name,
        size: image.size
      }))}
    />
  )
}

export default Page
