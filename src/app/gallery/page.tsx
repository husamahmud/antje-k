import Image from "next/image"

const images = [
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '6.png',
  '7.png',
  '8.png',
  '8.png',
  '9.png',
  '7.png',
  '7.png',
  '8.png',
  '9.png',
]

const Page = () => {
  return (
    <div className="container mx-auto flex flex-wrap gap-8 h-full flex-1 px-3 py-20">
      {images.map((image, index) => (
        <div className="flex-1 min-w-0" style={{ flexBasis: 'calc(25% - 24px)' }}>
          <Image
            key={index}
            src={`/gallery/${image}`}
            alt="Gallery"
            className="object-cover w-full h-auto"
            width={360}
            height={240}
          />
        </div>
      ))}
    </div>
  )
}

export default Page
