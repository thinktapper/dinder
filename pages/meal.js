// import Image from 'next/image'
import RestaurantCards from '../components/RestaurantCards'
// import { useEffect, useState } from 'react'

export default function Meal(){


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
      <RestaurantCards />
    </div>
  )
}