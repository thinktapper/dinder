import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'

export default function Meal(){
  const [restaurants, setRestaurants] = useState([
    {
      "id": "001",
      "image": "https://imgur.com/OckVkRo.jpg",
      "name": "HasCheesBurgers",
      "description": "After deciding if canHasCheesburger, get off your can and can-can on down to HasCheeseburger for all your cheeseburger needs.",
      "cuisine": "American",
      "price": "$$",
      "lat": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "002",
      "image": "https://imgur.com/oPj4A8u.jpg",
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
      "image": "https://imgur.com/Q9WPlWA.jpg",
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
      "image": "https://imgur.com/wDmRJPc.jpg",
      "name": "The Mill",
      "description": "Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures.",
      "cuisine": "American",
      "price": "$$$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    }
  ])

  useEffect(() => {


  }, [restaurants])

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
      </>
    //       <div className="absolute bottom-0 p-2.5">
    //
    //       </div>
    //     </div>
    //
    //   </div>
    // </div>
)}