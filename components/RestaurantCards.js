import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'

export default function Meal(){
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
    <div className='flex justify-between'>
      <div className='w-2/3 flex flex-col justify-center items-center h-full'>
        <div className='w-96 h-{650}'>
          {restaurants?.map(restaurant =>
            <TinderCard className="absolute" key={restaurant.id} onSwipe={(dir) => swiped(dir, restaurant.id)} onCardLeftScreen={() => outOfFrame(restaurant.name)}>
              <div className="w-96 h-{650} bg-cover bg-center shadow-md rounded-lg overflow-hidden">
                <Image className='absolute top-0 h-full w-full rounded-xl' src={restaurant.image} alt={restaurant.name} width={320} height={240} />
                <h3 className="text-xl font-bold text-center mt-0 p-4">{restaurant.name}</h3>
              </div>
            </TinderCard>

          )}
          <div className="absolute bottom-0 p-2.5">

          </div>
        </div>

      </div>
    </div>
)}