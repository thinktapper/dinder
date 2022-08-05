import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
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

  return (
      <form className='rounded-md border broder-gray-300 bg-white p-2'>
        <div className='flex items-center space-x-6 mt-3'>
          <input
              {...register('name', { required: true })}
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