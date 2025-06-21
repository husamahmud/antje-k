import { join } from 'node:path'
import { readdirSync } from 'node:fs'
import ImageGallery from '../../components/Imagegallery'

type ImageData = {
  id: number
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
    .map((file, index) => {
      // New format: 1_Abstract-Flow_Acrylic-on-Canvas_24,18,1.5.jpg
      const [, name, type, sizeStr] = file.replace(/\.(png|jpg|jpeg)$/, '').split('_')
      const [width, height, depth] = sizeStr.split(',').map((num) => Number.parseFloat(num))
      return {
        id: index + 1,
        src: `/images/${encodeURIComponent(file)}`,
        name: name.replace(/-/g, ' '), // Convert hyphens back to spaces for display
        size: [width, height, depth] as [number, number, number],
        type: type.replace(/-/g, ' '), // Convert hyphens back to spaces for display
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
