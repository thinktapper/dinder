import { ArrowUturnLeftIcon, XMarkIcon, StarIcon, HeartIcon, BoltIcon } from '@heroicons/react/24/solid'
// import { Button } from '@headlessui/react'
// import IconButton from '@material-ui/core/IconButton'

const SwipeButtons = () => {
  return (
    <div className="flex fixed justify-evenly w-full bottom-[10vh]">
      <ArrowUturnLeftIcon className="h-12 text-gray-500" />
      <XMarkIcon className="h-12 text-red-500" />
      <StarIcon className="h-12 text-blue-400" />
      <HeartIcon className="h-12 text-green-500" />
      <BoltIcon className="h-12 text-yellow-300" />
    </div>
  )

}

export default SwipeButtons