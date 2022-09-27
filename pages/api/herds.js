import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  // Create new feast
  if (req.method === 'POST') {
    try {
      let { name, endDate, startDate, lat, long, distance, herd } = req.body
      lat = parseFloat(lat)
      long = parseFloat(long)

      // Retrieve the current authenticated user
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })

      const feast = await prisma.feast.create({
        data: {
          name,
          endDate,
          startDate,
          lat,
          long,
          distance,
          organizerId: user.id,
          herd: herd.id,
        },
      })
      res.status(200).json(feast)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Something went wrong', e })
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['POST'])
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}
