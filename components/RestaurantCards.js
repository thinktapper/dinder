import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'

export default function Meal() => {
  const restaurants = [
    {
      "id": "001",
      "image": "https://loremflickr.com/320/240/restaurant",
      "name": "HasCheesBurgers",
      "description": "After deciding if canHasCheesburger, get off your can and can-can on down to HasCheeseburger for all your cheeseburger needs.",
      "cuisine": "American",
      "price": "$$",
      "lat": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "002",
      "image": "https://loremflickr.com/320/240/restaurant",
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
      "image": "https://loremflickr.com/320/240/restaurant",
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
      "image": "https://loremflickr.com/320/240/restaurant",
      "name": "The Mill",
      "description": "Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures.",
      "cuisine": "American",
      "price": "$$$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    }
  ]

  const [lastDirection, setLastDirection] = useState('')

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = name => {
    console.log('removing: ' + name)
  }


  return (
    <div>
      <div className='flex-1 -mt-6'>
        <div className='relative bg-white h-3/4 rounded-xl'>
          {restaurants.map(restaurant =>
            <TinderCard className="swipe" key={restaurant.id} onSwipe={(dir) => swiped(dir, restaurant.name)} onCardLeftScreen={() => outOfFrame(restaurant.name)}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image className='absolute top-0 h-full w-full rounded-xl' src={restaurant.image} alt={restaurant.name} width={320} height={240} />
                <h3 className="text-xl font-bold text-center p-4">{restaurant.name}</h3>
              </div>
            </TinderCard>

          )}
          <div className="absolute bottom-0 bg-white w-full flex-row justify-between items-between h-20 px-6 py-2 rounded-b-xl">

          </div>
        </div>

      </div>
    </div>
)}