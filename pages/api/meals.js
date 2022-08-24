import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  // Create new meal
  if (req.method === 'POST') {
    try {
      let { name, endDate, voteDate, lat, long, distance, guestList } = req.body
      lat = parseFloat(lat)
      long = parseFloat(long)

      // Retrieve the current authenticated user
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })

      const meal = await prisma.meal.create({
        data: {
          name,
          endDate,
          voteDate,
          lat,
          long,
          distance,
          organizerId: user.id,
          joinedBy: guestList,
        },
      })
      res.status(200).json(meal)
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
