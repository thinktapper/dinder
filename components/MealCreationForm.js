import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  endDate: yup.string().trim().required('End date is required'),
  voteDate: yup.string().trim().required('Vote date is required'),
  lat: yup.number().required('Latitude is required'),
  long: yup.number().required('Longitude is required'),
  distance: yup.number().required('Distance / Radius is required'),
})

const MealCreationForm = () => {
  const { data: session } = useSession()
  const { register, setValue, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    console.log (data)
    await axios.post('/api/meals', data)
  })

  return (
      <form
        onSubmit={onSubmit}
        className='rounded-md border broder-gray-300 bg-white p-2'
      >
        <div className='flex items-center space-x-6 mt-3'>
          <input
              {...register('name')}
              type='text'
              name='name'
              // label='Meal'
              // value={name}
              className='rounded-md flex-1 bg-gray-50 p-2 outline-none'
              placeholder='e.g. Meal with friends...'
              disabled={!session}
          />
          <p>{errors.name?.message}</p>
        </div>

        {!!watch('name') && (
            <div className='flex flex-col py-2'>
              <div className='flex items-center px-2'>
                <p className='min-w-[90px]'>Voting Start:</p>
                <input
                  {...register('voteDate')}
                  className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                  type='date'
                  name='voteDate'
                />
                <p>{errors.voteDate?.message}</p>
              </div>
              <div className='flex items-center px-2'>
                <p className='min-w-[90px]'>Voting End:</p>
                <input
                  {...register('endDate')}
                  className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                  type='date'
                  name='endDate'
                />
                <p>{errors.endDate?.message}</p>
              </div>
              <div className='flex items-center px-2'>
                <input
                  {...register('lat')}
                  name='lat'
                  label='Latitude'
                  type='number'
                  placeholder='44.977753'
                />
                <p>{errors.lat?.message}</p>
                <input
                    {...register('long')}
                    name='long'
                    label='Longitude'
                    type='number'
                    placeholder='-93.265015'
                />
                <p>{errors.long?.message}</p>
              </div>
              <div>
                <label>
                  Distance
                  <select
                      {...register('distance')}
                      // value={distance}
                      // onChange={e => setRadius(e.target.value)}
                      className="w-full py-2 pl-4 truncate transition border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed focus:border-gray-400 focus:ring-gray-400">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </label>
                <p>{errors.distance?.message}</p>
              </div>

              {!!watch('name') && (
                  <button
                    className='w-full rounded-full bg-blue-400 p-2 text-white'
                    type='submit'
                  >
                    Create Meal
                  </button>
              )}
            </div>
        )}
      </form>
  )
}

export default MealCreationForm