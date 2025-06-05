export interface ImageData {
  src: string
  name: string
  size: [number, number, number]
  type: string
}

export const images: ImageData[] = [
  {
    src: '/1.jpg',
    name: 'Abstract Flow',
    size: [24, 18, 1.5],
    type: 'Acrylic on Canvas',
  },
  // 1_Abstract Flow_Acrylic on Canvas_24, 18, 1.5.jpg
  {
    src: '/2.jpg',
    name: 'Sunset over Hills',
    size: [36, 24, 2],
    type: 'Oil on Canvas',
  },
  // 2_Sunset over Hills_Oil on Canvas_36, 24, 2.jpg
  {
    src: '/3.jpg',
    name: 'City Lights',
    size: [20, 10, 1],
    type: 'Digital Art',
  },
  // 3_City Lights_Digital Art_20, 10, 1.jpg
  {
    src: '/4.jpg',
    name: 'Forest Stream',
    size: [30, 40, 1.8],
    type: 'Watercolor',
  },
  // 4_Forest Stream_Watercolor_30, 40, 1.8.jpg
  {
    src: '/5.jpg',
    name: 'Geometric Patterns',
    size: [12, 12, 0.8],
    type: 'Mixed Media',
  },
  // 5_Geometric Patterns_Mixed Media_12, 12, 0.8.jpg
  {
    src: '/6.jpg',
    name: 'Portrait Study',
    size: [16, 20, 1.2],
    type: 'Charcoal',
  },
  // 6_Portrait Study_Charcoal_16, 20, 1.2.jpg
  {
    src: '/7.jpg',
    name: 'Still Life with Fruit',
    size: [28, 22, 1.5],
    type: 'Pastel',
  },
  // 7_Still Life with Fruit_Pastel_28, 22, 1.5.jpg
  {
    src: '/8.jpg',
    name: 'Ocean Waves',
    size: [48, 36, 2.5],
    type: 'Acrylic & Oil Pastel',
  },
  // 8_Ocean Waves_Acrylic & Oil Pastel_48, 36, 2.5.jpg
  {
    src: '/9.jpg',
    name: 'Mountain Landscape',
    size: [36, 24, 2],
    type: 'Oil on Canvas',
  },
  // 9_Mountain Landscape_Oil on Canvas_36, 24, 2.jpg
  {
    src: '/10.jpg',
    name: 'Urban Skyline',
    size: [40, 30, 2.2],
    type: 'Oil on Canvas',
  },
  // 10_Urban Skyline_Oil on Canvas_40, 30, 2.2.jpg
  {
    src: '/11.jpg',
    name: 'Abstract Cityscape',
    size: [32, 24, 1.8],
    type: 'Acrylic on Canvas',
  },
  // 11_Abstract Cityscape_Acrylic on Canvas_32, 24, 1.8.jpg
]
