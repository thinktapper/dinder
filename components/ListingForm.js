import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Formik, Form } from 'formik'
import Input from '@/components/Input'

const ListingSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  endDate: Yup.string().trim().required(),
  voteDate: Yup.string().trim().required(),
  lat: Yup.number().integer().required(),
  long: Yup.number().integer().required(),
  distance: Yup.number().positive().integer().min(1).required(),
  guests: Yup.array(),
})


const ListingForm = ({
  userEmail = null,
  users = [],
  initialValues = null,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => null,
}) => {
  const router = useRouter()

  let guests = []

  const [radius, setRadius] = useState('1')
  const [disabled, setDisabled] = useState(false)

  const handleCheckbox = (e) => {
    const { checked, value } = e.target
    checked ? guests.push(value) : guests.splice(guests.indexOf(value), 1)
    return guests
  }

  const handleOnSubmit = async (values = null) => {
    let toastId
    try {
      setDisabled(true)
      toastId = toast.loading('Submitting...')
      // Submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values })
      }
      toast.success('Successfully submitted', { id: toastId })
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath)
      }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId })
      setDisabled(false)
    }
  }

  const { ...initialFormValues } = initialValues ?? {
    name: '',
    endDate: '',
    voteDate: '',
    lat: '',
    long: '',
    distance: '',
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}>
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-8">
            <div className="space-y-6">
              <Input
                name="name"
                type="text"
                label="Name"
                placeholder="e.g. Meal with friends..."
                disabled={disabled}
              />

              <Input
                name="voteDate"
                type="date"
                label="Meal date"
                disabled={disabled}
              />

              <Input
                name="endDate"
                type="date"
                label="Closing date"
                disabled={disabled}
              />

              <div className="flex space-x-4">
                <Input
                  name="lat"
                  type="number"
                  label="Latitude"
                  placeholder="42"
                  disabled={disabled}
                />
                <Input
                  name="long"
                  type="number"
                  label="Longitude"
                  placeholder="42"
                  disabled={disabled}
                />
                {/*<Input*/}
                {/*  name="distance"*/}
                {/*  type=""*/}
                {/*  min="1"*/}
                {/*  label="Radius"*/}
                {/*  placeholder="1"*/}
                {/*  disabled={disabled}*/}
                {/*/>*/}
                <label>
                  Distance
                  <select
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className='w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed border-gray-300 focus:border-gray-400 focus:ring-gray-400'
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-col items-center mb-4">
              <h3>Invite friends</h3>
              <div className="overflow-y-auto px-3 pb-3 h-48">
                <ul className='text-sm font-medium rounded-lg'>
                  {users.filter(user => user.email !== userEmail).map(friend => {
                    return (
                        <li key={friend.id} className=''>
                          <div className='flex items-center p-2 rounded'>
                            <Input
                                name='friends'
                                className='w-4 h-4 mr-3 rounded'
                                type='checkbox'
                                inputprops={{ 'aria-label': 'guests' }}
                                value={friend.id}
                                onChange={handleCheckbox}
                            />
                            <img
                                src={
                                    friend.image || '/flame.svg'
                                }
                                alt=''
                                className='max-w-[50px] max-h-[50px] rounded-[50px]'
                            />
                            <span className='py-3 ml-2 w-full text-sm font-medium'>{friend.username || 'Friend'}</span>

                          </div>
                        </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="px-6 py-2 text-white transition rounded-md bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600">
                {isSubmitting ? 'Submitting...' : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    endDate: PropTypes.string,
    voteDate: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    distance: PropTypes.number,
    guests: PropTypes.array,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default ListingForm
