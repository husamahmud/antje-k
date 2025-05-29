import Image from 'next/image'

const images = [
  '2.png',
  '7.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '8.png',
  '9.png',
]

const Page = () => {
  return (
    <div className="container mx-auto grid grid-cols-4 h-full flex-1 gap-x-8 gap-y-8 px-3 py-20">
      {images.map((image, index) => (
        <Image
          key={index}
          src={`/gallery/${image}`}
          alt="Gallery"
          className="w-full h-fit object-cover my-auto object-center shadow-[0px_2.14px_8.54px_0px_#0000004D,10.68px_10.68px_36.3px_0px_#00000026,0px_2.14px_7.47px_0px_#1F1E1359]"
          width={360}
          height={240}
        />
      ))}
    </div>
  )
}

export default Page
