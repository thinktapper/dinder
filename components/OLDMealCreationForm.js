import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Loader from './Loader';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import Input from '@/components/Input';
// import ImageUpload from '@/components/ImageUpload';
import axios, { Axios } from 'axios';
// import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const MealSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  endDate: Yup.date().required(),
  voteDate: Yup.date().required(),
  lat: Yup.number().required(),
  long: Yup.number().required(),
  distance: Yup.number().positive().integer().min(1).required(),
  users: Yup.array(),
});

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   const users = await prisma.user.findMany({
//     where: { email: session.user.email },
//     select: { friendsList: true },
//   })

//   const organizer = await prisma.user.findUnique({
//     where: { id: session.user.id }
//   })

//   return {
//     props: {
//       users: JSON.parse(JSON.stringify(users)),
//       organizer: JSON.parse(JSON.stringify(organizer))
//     }
//   }
// }


const MealCreationForm = ({
  users,
  organizer,
  initialValues = null,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  // const [imageUrl, setImageUrl] = useState(initialValues?.image ?? '');
  const [error, setError] = useState('')
  const [mealName, setMealName] = useState('')
  const [mDate, setMealDate] = useState('')
  const [mClosingDate, setMealClosingDate] = useState('')
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  })
  const [myLocation, setMyLocation] = useState({
    lat: null,
    lng: null,
  })
  const [radius, setRadius] = useState('1')
  // const [{ loading: mealLoading, error: mealError }] = useState(null)
  const [mData, setReturnedMealData] = useState(null)
  const [myLocationReadable, setMyLocationReadable] = useState('')
  const [missLocation, setMissLocation] = useState(false)

  const session = getSession()

  let guestList = []

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latlng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latlng)
  }

  const getMyLocation = async () => {
    const position = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    setMyLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
    setCoordinates({ lat: null, lng: null })
    getMyLocationReadable(position.coords.latitude, position.coords.longitude)
  }

  const getMyLocationReadable = (lat, lng) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`)
      .then((res) => {
        setMyLocationReadable(res.data.results[0].formatted_address)
      })
      .catch((err) => {
        setError(err)
      })
  }

  const handleCheckbox = meal => {
    const { checked, value } = meal.target
    checked ? guestList.push(value) : guestList.splice(guestList.indexOf(value), 1)
    return guestList
  }

  const handleSubmit = meal => {
    meal.preventDefault()
    const name = mealName
    const lat = !coordinates.lat ? `${myLocation.lat}` : `${coordinates.lat}`
    const long = !coordinates.lng ? `${myLocation.lng}` : `${coordinates.lng}`
    const distance = radius
    const endDate = new Date(mDate).toISOString()
    const voteDate = new Date(mClosingDate).toISOString()

    // const users = guestList

    const setMeal = data => ({
      data: {
        name: name,
        lat: lat,
        long: long,
        distance: distance,
        endDate: endDate,
        voteDate: voteDate,
        organizer: organizer,
        users: guestList,
      }
    })

    if (lat === 'null' || long === 'null'){
      setMissLocation(true)
    }else{
      setMissLocation(false)
      // const session = await getSession()
      // const user = await prisma.user.findUnique({
      //   where: { email: session.user.email }
      // })
      // const meal = await prisma.meal.create({
      //   data: { name, endDate, voteDate, lat, long, distance, users, organizerID: user.id }
      // })
      const data = { name, endDate, voteDate, lat, long, distance, users, organizerID: session.user.id }
      axios.post('/api/meals', data)
      // setMeal({
      //   data: {
      //     name,
      //     lat,
      //     long,
      //     distance,
      //     endDate,
      //     voteDate,
      //     organizer,
      //     users,
      //   },
      // })
        .then(({ data }) => {
          setReturnedMealData(data)
        })
        // try{
        //   setReturnedMealData(mData)
        // }
        .catch((err) => {
          setError(err)
        })
      clearForm()
    }
  }

  const clearForm = () => {
    setMealName('')
    setMealDate('')
    setMealClosingDate('')
    setAddress('')
    setCoordinates({ lat: null, lng: null })
    setMyLocation({ lat: null, lng: null })
    setRadius('1')
  }

  // const upload = async image => {
  //   if (!image) return;

  //       let toastId;
  //       try {
  //         setDisabled(true);
  //         toastId = toast.loading('Uploading...');
  //         const { data } = await axios.post('/api/image-upload', { image });
  //         setImageUrl(data?.url);
  //         toast.success('Successfully uploaded', { id: toastId });
  //       } catch (e) {
  //         toast.error('Unable to upload', { id: toastId });
  //         setImageUrl('');
  //       } finally {
  //         setDisabled(false);
  //       }
  // };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      const name = mealName
      const lat = !coordinates.lat ? `${myLocation.lat}` : `${coordinates.lat}`
      const long = !coordinates.lng ? `${myLocation.lng}` : `${coordinates.lng}`
      const distance = radius
      const endDate = new Date(mDate).toISOString()
      const voteDate = new Date(mClosingDate).toISOString()
      if (lat === 'null' || long === 'null'){
        setMissLocation(true)
      }else{
        setMissLocation(false)
      toastId = toast.loading('Submitting...');
      // Submit data
      if (typeof onSubmit === 'function') {
        const data = await onSubmit({ ...values });
        console.log(data)
      }
      toast.success('Successfully submitted', { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId });
      setDisabled(false);
    }
  };

  // const { image, ...initialFormValues } = initialValues ?? {
  //   image: '',
  //   title: '',
  //   description: '',
  //   price: 0,
  //   guests: 1,
  //   beds: 1,
  //   baths: 1,
  // };

  const { ...initialFormValues } = initialValues ?? {
    name: '',
    endDate: '',
    voteDate: '',
    lat: '',
    long: '',
    distance: '',
    organizer: '',
    users: [],
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={MealSchema}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-8">
            <div className="space-y-6">
              <Input
                name="mealName"
                type="text"
                label="Meal"
                value={mealName}
                placeholder="e.g. Meal with friends..."
                onChange={(e) => setMealName(e.target.value)}
                disabled={disabled}
              />
              {!myLocation.lat && (
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
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
                        name='location'
                        type='textarea'
                        label='location'
                      />

                      <div>
                        {loading && <Loader />}
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? '#d1e7ed' : '#fff',
                          }
                          return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                              {suggestion.description}
                            </div>
                          )
                        })}
                      </div>

                    </div>
                  )}
                </PlacesAutocomplete>
              )}
          <button
            className='mb-5 bg-blue-500 rounded'
            onClick={() => getMyLocation}
          >
            Use My Location
          </button>
          {myLocation.lat && (
            <div className='-mt-5 mb-10'>
              <h3>Your location</h3>
              <p>{myLocationReadable}</p>
            </div>
          )}

          <label>
            Radius
            <select
              value={radius}
              label='Radius'
              onChange={(e) => setRadius(e.target.value)}
              inputprops={{
                name: 'radius',
                id: 'radius',
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>

              <Input
                name="mealDate"
                type="date"
                label="Meal date"
                required
                onChange={(e) => setMealDate(e.target.value)}
                disabled={disabled}
              />
              <Input
                name="mealClosingDate"
                type="date"
                label="Closing date"
                required
                onChange={(e) => setMealClosingDate(e.target.value)}
                disabled={disabled}
              />

              <div className="flex space-x-4">
                <h3>Invite friends</h3>
              <div className="m-h-36 overflow-auto">
                <ul>
                  {users.filter(user => user.id !== organizer).map(friend => {
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
                          <Input
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
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-rose-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600"
              >
                {isSubmitting ? 'Submitting...' : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

MealCreationForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    endDate: PropTypes.string,
    voteDate: PropTypes.string,
    lat: PropTypes.string,
    long: PropTypes.string,
    distance: PropTypes.string,
    organizer: PropTypes.string,
    users: PropTypes.string,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default MealCreationForm;
