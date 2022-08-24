import { useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Formik, Form, ErrorMessage } from 'formik'
import Input from '@/components/Input'
import Loader from '/components/Loader'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

const ListingSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  endDate: Yup.string().trim().required(),
  voteDate: Yup.string().trim().required(),
  // lat: Yup.number().required(),
  // long: Yup.number().required(),
  location: Yup.object().shape({lat: Yup.number().required(), long: Yup.number().required()}),
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
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null,
  })
  const [myLocation, setMyLocation] = useState({
    lat: null,
    long: null,
  })
  const [myLocationReadable, setMyLocationReadable] = useState('')
  const [missLocation, setMissLocation] = useState(false)

  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const latlng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latlng)
    // setMyLocation({
    //   lat: latlng.lat,
    //   lng: latlng.lng,
    // })
    const lat = latlng.lat
    const long = latlng.lng

    console.log('latlng -> ', latlng)
    console.log(lat, long)

    return (lat, long)
  }

  const getMyLocationReadable = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_API_KEY}`
      )
      setMyLocationReadable(res.data.results[0].formatted_address)
      console.log('mylocationreadable -> ', myLocationReadable)
    } catch (e) {
      console.error(e)
    }
  }

  // const getMyLocation = async () => {
  //   const position = await new Promise(function (resolve, reject) {
  //     navigator.geolocation.getCurrentPosition(resolve, reject)
  //   })
  //   setMyLocation({
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude,
  //   })
  //   setCoordinates({ lat: null, lng: null })
  //   console.log(myLocation)
  //   await getMyLocationReadable(position.coords.latitude, position.coords.longitude)
  // }

  const handleCheckbox = e => {
    const { checked, value } = e.target
    checked ? guests.push(value) : guests.splice(guests.indexOf(value), 1)
    return guests
  }

  const handleOnSubmit = async (values) => {
    // e.preventDefault()
    let toastId
    console.log(values)
    try {
      setDisabled(true)
      toastId = toast.loading('Submitting...')

      console.log(...values)
      // Submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values })
      }
      toast.success('Successfully submitted', { id: toastId })
      // Redirect user
      if (redirectPath) {
        await router.push(redirectPath)
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
    location: {lat: '', long: ''},
    // lat: '',
    // long: '',
    distance: '',
    guests: [],
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
        // onSubmit={() => console.log('farts')}
      >
        {props => {
          const { isSubmitting, handleSubmit, isValid, touched, errors } = props
          return (
            <Form className="space-y-8">
              <div className="space-y-6">
                <Input
                  name="name"
                  // value="testito"
                  type="text"
                  label="Name"
                  placeholder="e.g. Meal with friends..."
                  disabled={disabled}
                />
                <ErrorMessage
                  className="errorMsg"
                  component="div"
                  name="name"
                />
                {touched.name && errors.name && <div>{errors.name}</div>}
                {!myLocation.lat && (
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                    disabled={disabled}>
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <Input
                          {...getInputProps({
                            placeholder: 'Start typing your location...',
                          })}
                          name="location"
                          // name={location: { lat, lng }}
                          type="textarea"
                          label="location"
                          // disabled={disabled}
                        />
                        <ErrorMessage
                          className="errorMsg"
                          component="div"
                          name="location"
                        />
                        {touched.location && errors.location && (
                          <div>{errors.location}</div>
                        )}
                        <div>
                          {loading && <Loader />}
                          {suggestions.map(suggestion => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? '#d1e7ed'
                                : '#fff',
                            }
                            return (
                              <div
                                key={suggestion.id}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}>
                                {suggestion.description}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                )}
                {/*<button*/}
                {/*    className='mb-5 bg-blue-500 rounded'*/}
                {/*    onClick={() => getMyLocation()}*/}
                {/*    disabled={disabled}*/}
                {/*>*/}
                {/*  Use My Location*/}
                {/*</button>*/}
                {/*{myLocation.lat && (*/}
                {/*    <div className='mb-10 -mt-5'>*/}
                {/*      <h3>Your location</h3>*/}
                {/*      <p>{myLocationReadable}</p>*/}
                {/*    </div>*/}
                {/*)}*/}

                <div className="flex space-x-4">
                  {/*<Input*/}
                  {/*  name="lat"*/}
                  {/*  // value="42.123456"*/}
                  {/*  type="number"*/}
                  {/*  label="Latitude"*/}
                  {/*  placeholder="42"*/}
                  {/*  disabled={disabled}*/}
                  {/*/>*/}
                  {/*<Input*/}
                  {/*  name="long"*/}
                  {/*  // value="42.123344"*/}
                  {/*  type="number"*/}
                  {/*  label="Longitude"*/}
                  {/*  placeholder="42"*/}
                  {/*  disabled={disabled}*/}
                  {/*/>*/}
                  <Input
                    name="voteDate"
                    type="date"
                    // value="2022-07-27"
                    label="Meal date"
                    disabled={disabled}
                  />
                  <ErrorMessage
                    className="errorMsg"
                    component="div"
                    name="voteDate"
                  />

                  <Input
                    name="endDate"
                    // value="2022-07-28"
                    type="date"
                    label="Closing date"
                    disabled={disabled}
                  />
                  <ErrorMessage
                    className="errorMsg"
                    component="div"
                    name="endDate"
                  />
                  <label>
                    Distance
                    <select
                      value={radius}
                      onChange={e => setRadius(e.target.value)}
                      className="w-full py-2 pl-4 truncate transition border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed focus:border-gray-400 focus:ring-gray-400">
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </label>
                </div>
              </div>
              {console.log (errors), console.log (touched)}

              <div className="flex flex-col items-center mb-4">
                <h3>Invite guests</h3>
                <div className="h-48 px-3 pb-3 overflow-y-auto">
                  <ul className="text-sm font-medium rounded-lg">
                    {users
                      .filter(user => user.email !== userEmail)
                      .map(friend => {
                        return (
                          <li key={friend.id} className="">
                            <div className="flex items-center p-2 rounded">
                              <Input
                                name="friends"
                                className="w-4 h-4 mr-3 rounded"
                                type="checkbox"
                                inputprops={{ 'aria-label': 'guests' }}
                                value={friend.id}
                                onChange={handleCheckbox}
                              />
                              <img
                                src={friend.image || '/flame.svg'}
                                alt=""
                                className="max-w-[50px] max-h-[50px] rounded-[50px]"
                              />
                              <span className="w-full py-3 ml-2 text-sm font-medium">
                                {friend.username || 'Friend'}
                              </span>
                            </div>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </div>
              <ErrorMessage
                className="errorMsg"
                component="div"
                name="friends"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={disabled || !isValid}
                  className="px-6 py-2 text-white transition rounded-md bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600">
                  {isSubmitting ? 'Submitting...' : buttonText}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    endDate: PropTypes.string,
    voteDate: PropTypes.string,
    location: PropTypes.object,
    // lat: PropTypes.number,
    // long: PropTypes.number,
    distance: PropTypes.number,
    guests: PropTypes.array,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default ListingForm
