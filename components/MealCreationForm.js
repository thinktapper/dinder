// import Input from '@/components/Input'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  endDate: yup.string().trim().required('End date is required'),
  voteDate: yup.string().trim().required('Vote date is required'),
  // lat: yup.number().required('Latitude is required'),
  // long: yup.number().required('Longitude is required'),
  lat: yup.string().trim().required('Latitude is required'),
  long: yup.string().trim().required('Longitude is required'),
  distance: yup.number().required('Distance / Radius is required'),
  guests: yup.array(),
})

const MealCreationForm = ({ users, organizer, redirectPath }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { register, setValue, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  })
  const [address, setAddress] = useState(null)
  let guestList = []

  const handleCheckbox = meal => {
    const { checked, value } = meal.target
    checked ? guestList.push(value) : guestList.splice(guestList.indexOf(value), 1)
    return guestList
  }

  // const data = {
  //   name: watch('name'),
  //   endDate: watch('endDate'),
  //   voteDate: watch('voteDate'),
  //   lat: watch('lat'),
  //   long: watch('long'),
  //   distance: watch('distance'),
  //   guests: guestList,
  // }

  const onSubmit = handleSubmit(async (data) => {
    console.log (data)
    let toastId
    try {
      toastId = toast.loading('Creating meal...')
      await axios.post('/api/meals', data)
      toast.success('Meal created!', { id: toastId })

      // Redirect user
      if (redirectPath){
        await router.push(redirectPath)
      }
    } catch (e) {
      toast.error('Unable to create meal', { id: toastId })
    }
  })

  return (
      <form
        onSubmit={onSubmit}
        className='rounded-md border broder-gray-300 bg-white p-2 space-y-8'
      >
        <div className='flex items-center space-y-6 mt-3'>
          <input
              {...register('name')}
              type='text'
              name='name'
              // label='Meal'
              // value={name}
              // className='rounded-md flex-1 bg-gray-50 p-2 outline-none'
              className={classNames(
                'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
                errors.name
                  ? 'border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
              )}
              placeholder='e.g. Meal with friends...'
              disabled={!session}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <GooglePlacesAutocomplete
            apiKey={process.env.GOOGLE_API_KEY}
            selectProps={{
              onChange: async (value) => {
                const address = value.label

                const results = await geocodeByAddress(address)
                const { lat, lng } = await getLatLng(results[0])
                setValue('lat', lat)
                setValue('long', lng)
              }
            }}
          />
        </div>

          <div className='flex space-x-4'>
            <div className='relative'>
              <p className='min-w-[90px]'>Voting Start:</p>
              <input
                {...register('voteDate')}
                // className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                className={classNames(
                  'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
                  errors.voteDate
                    ? 'border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400'
                    : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
                )}
                type='date'
                name='voteDate'
              />
              <p>{errors.voteDate?.message}</p>
            </div>
            <div className='relative'>
              <p className='min-w-[90px]'>Voting End:</p>
              <input
                {...register('endDate')}
                // className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                className={classNames(
                  'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
                  errors.endDate
                    ? 'border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400'
                    : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
                )}
                type='date'
                name='endDate'
              />
              <p>{errors.endDate?.message}</p>
            </div>
            {/*<div className='flex space-x-4'>*/}
            {/*  <input*/}
            {/*    {...register('lat')}*/}
            {/*    name='lat'*/}
            {/*    label='Latitude'*/}
            {/*    type='number'*/}
            {/*    placeholder='44.977753'*/}
            {/*  />*/}
            {/*  <p>{errors.lat?.message}</p>*/}
            {/*  <input*/}
            {/*      {...register('long')}*/}
            {/*      name='long'*/}
            {/*      label='Longitude'*/}
            {/*      type='number'*/}
            {/*      placeholder='-93.265015'*/}
            {/*  />*/}
            {/*  <p>{errors.long?.message}</p>*/}
            {/*</div>*/}
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

            <div className="flex space-x-4">
              <h3>Invite friends</h3>
              <div className="m-h-36 overflow-auto">
                <ul>
                  {users.filter(user => user.email !== organizer).map(friend => {
                    return (
                      <li key={friend.id}>
                        <img
                          src={
                            friend.image || '/flame.svg'
                          }
                          alt=''
                          className='max-w-[50px] max-h-[50px] rounded-[50px]'
                        />
                        {friend.username || 'Friend'}
                        <input
                          {...register('guests')}
                          name='friends'
                          type='checkbox'
                          inputprops={{ 'aria-label': 'guests' }}
                          value={friend.id}
                          onChange={handleCheckbox}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
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
      </form>
  )
}

export default MealCreationForm