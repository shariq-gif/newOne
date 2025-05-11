import { v2 as cloudinary } from 'cloudinary'
import type { NextApiRequest, NextApiResponse } from 'next'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [imagesResult, videosResult] = await Promise.all([
      cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        prefix: '', // optional folder
        max_results: 100,
      }),
      cloudinary.api.resources({
        type: 'upload',
        resource_type: 'video',
        prefix: '', // optional folder
        max_results: 100,
      }),
    ])

    const photos = [...imagesResult.resources, ...videosResult.resources].map((resource) => ({
      src: resource.secure_url,
      width: resource.width,
      height: resource.height,
      caption: resource.context?.custom?.caption || '',
      type: resource.resource_type === 'video' ? 'video' : 'image',
    }))

    res.status(200).json(photos)
  } catch (error) {
    console.error('Cloudinary API error:', error)
    res.status(500).json({ error: 'Failed to fetch images and videos from Cloudinary' })
  }
}
