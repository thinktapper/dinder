import { useSession } from 'next-auth/react'

const MealCreationForm = () => {
  const { data: session } = useSession()

  return (
      <form className='rounded-md border broder-gray-300 bg-white p-2'>
        <div className='flex items-center space-x-6 mt-3'>
          <input
              type='text'
              name='name'
              // label='Meal'
              value={name}
              className='rounded-md flex-1 bg-gray-50 p-2 outline-none'
              placeholder='e.g. Meal with friends...'
              disabled={!session}
          />
        </div>
      </form>
  )
}

export default MealCreationForm