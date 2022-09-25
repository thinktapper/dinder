import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
// import SwipeButtons from '/components/SwipeButtons'
import axios from 'axios'

export async function getServerSideProps({ meal }) {
  // Fetch data from external API
  // const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${meal.lat}%2C${meal.long}&radius=${Math.floor(meal.distance * 1609)}&type=restaurant&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)

  const res = await fetch('https://api.yelp.com/v3/businesses/search', {
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
  const data = await res.json()

  // Pass data to the page via props
  return { props: JSON.parse(JSON.stringify(data)) }
}

export default function Meal({ data }) {
  console.log(data)
  const [restaurants, setRestaurants] = useState([
    {
      "id": "001",
      "image": "https://imgur.com/RD79hZb.jpg",
      "name": "HasCheesBurgers",
      "description": "After deciding if canHasCheesburger, get off your can and can-can on down to HasCheeseburger for all your cheeseburger needs.",
      "cuisine": "American",
      "price": "$$",
      "lat": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "002",
      "image": "https://imgur.com/P20HZrk.jpg",
      "name": "Luxury houseboat",
      "description": "Sat three ready meat myself tonight replied terrible town anybody.",
      "cuisine": "Mexican",
      "price": "$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "003",
      "image": "https://imgur.com/CmDAQXP.jpg",
      "name": "Fishi Sushi",
      "description": "The fishiest Sushi around. Just follow your nose to Fishi Sushi. From the moment you walk in you will think to yourself, 'Something smells Fishi'.",
      "cuisine": "Asian",
      "price": "$$$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "004",
      "image": "https://imgur.com/tvwz4d9.jpg",
      "name": "The Mill",
      "description": "Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures.",
      "cuisine": "American",
      "price": "$$$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    }
  ])

  const fetchRestaurants = async () => {
    // fetch restaurants from yelp api
    const response = await fetch('/api/restaurants', {meal})
    const data = await response.json()
    console.log(data)

    // const res = await axios.get('https://api.yelp.com/v3/businesses/search', {
    //   headers: {
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`
    //   },
    //   params: {
    //     term: 'restaurants',
    //     latitude: meal.lat,
    //     longitude: meal.long,
    //     radius: meal.distance * 1609,
    //     sort_by: "relevance",
    //     limit: 50,
    //   }
    // })
    // setRestaurants(res.data.businesses)
    // console.log(res.data.businesses)

    // const {data} = await axios(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${meal.lat}%2C${meal.long}&radius=${Math.floor(meal.distance * 1609)}&type=restaurant&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    // setRestaurants(data.results)
    // console.log(data)

    // try {
    //   const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${meal.lat}%2C${meal.long}&radius=${Math.floor(meal.distance * 1609)}&type=restaurant&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    //   const data = await res.json()
    //   setRestaurants(data.results)
    //   console.log(data)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  useEffect(() => {
    // fetchRestaurants()

  }, [])

  const [lastDirection, setLastDirection] = useState('')

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = name => {
    console.log('removing: ' + name)
  }


  return (
    // <div className='bg-transparent'>
    //   <div className='w-2/3 flex flex-col justify-center items-center h-full'>
    //     <div className='w-96 h-{650}'>
      <>
        <div className='flex justify-center mt-[5vh]'>
          {restaurants?.map(restaurant =>
            <TinderCard className="absolute" key={restaurant.id} preventSwipe={['up', 'down']} onSwipe={(dir) => swiped(dir, restaurant.id)} onCardLeftScreen={() => outOfFrame(restaurant.name)}>
              <div style={{ backgroundImage: `url(${restaurant.image})` }} className='relative w-[400px] h-[650px] max-w-[85vw] p-5 rounded-lg shadow-2xl bg-no-repeat bg-center bg-cover'>
                <h3 className='absolute bottom-2.5 text-white'>{restaurant.name}</h3>
              </div>
            </TinderCard>

          )}

        </div>
        {/*<div className='flex flex-row justify-evenly'>*/}
        {/*  <SwipeButtons />*/}
        {/*</div>*/}
      </>
    //       <div className="absolute bottom-0 p-2.5">
    //
    //       </div>
    //     </div>
    //
    //   </div>
    // </div>
)}