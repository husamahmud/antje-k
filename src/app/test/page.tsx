import ImageGallery from "../Imagegallery"

const TestPage = () => {
  return <ImageGallery
    images={[
      { id: 1, src: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Mountains', description: '19 July 2024' },
      { id: 2, src: 'https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Bridge', description: '11 Nov 2022' },
      { id: 3, src: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'River', description: '18 Oct 2023' },
      { id: 4, src: 'https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Forest', description: '22 Mar 2024' },
    ]
    } />
};

export default TestPage;