import { join } from 'node:path'
import { readdirSync } from 'node:fs'
import ImageGallery from "../Imagegallery"

type ImageData = {
  id: number
  src: string
  name: string
}

// Server-side data fetching
async function getImages(): Promise<ImageData[]> {
  const imagesDir = join(process.cwd(), 'public', 'images')
  const files = readdirSync(imagesDir).filter(
    (file) => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
  )

  const images: ImageData[] = files
    .map((file, index) => {
      const nameWithoutExt = file.replace(/\.(png|jpg|jpeg)$/i, '')
      const parts = nameWithoutExt.split('_')
      const name = parts.length > 1 ? parts[1] : parts[0]
      
      return {
        id: index + 1,
        src: `/images/${file}`,
        name: name.replace(/[-_]/g, ' '), 
      }
    })

  return images
}

const TestPage = async () => {
  const images = await getImages()

  return (
    <ImageGallery
      images={images.map((image) => ({
        id: image.id,
        src: image.src,
        alt: image.name,
        description: image.name,
      }))}
    />
  )
};

export default TestPage;