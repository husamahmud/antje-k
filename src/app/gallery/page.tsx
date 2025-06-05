import { join } from 'node:path'
import { readdirSync } from 'node:fs'
import Image from 'next/image'
import { Transition } from '@/components/transition'

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

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <Transition className="container mx-auto flex flex-1 flex-col px-3 py-6 sm:py-10 md:py-15 lg:py-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative flex justify-center items-center"
          >
            <Image
              src={image.src}
              alt={image.name}
              className="w-full h-auto object-contain shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359]"
              width={0}
              height={0}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ width: '100%', height: 'auto' }}
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </Transition>
  )
}
