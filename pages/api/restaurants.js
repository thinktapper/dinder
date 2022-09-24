import nc from 'next-connect'
import cors from 'cors'

const handler = nc({ meal })
  .use(cors())
  .get(async (req, res) => {
    const response = await fetch('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`
      },
      params: {
        term: 'restaurants',
        latitude: meal.lat,
        longitude: meal.long,
        radius: meal.distance * 1609,
        sort_by: "relevance",
        limit: 50,
      }
    })
    res.json(response)
  })

export default handler