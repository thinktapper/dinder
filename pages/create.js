import Layout from '/components/Layout'
import Script from 'next/script'
import ListingForm from '/components/ListingForm'
import axios from 'axios'


const Create = () => {
    const addMeal = (data) => {
        console.log(data)
        axios.post('/api/meals', data)
    }
    // const session = props.session
    // const user = session.userId

    return (
        <Layout>
            <Script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAgNo6ibYDfbtoLpNN23JZ0zgC4b1ntDGY&libraries=places' />
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-xl font-medium text-gray-800">List your hunger</h1>
                <p className="text-gray-500">
                    Fill out the form below to start a new meal.
                </p>
                <div className="mt-8">
                    <ListingForm
                        buttonText="Add meal"
                        redirectPath="/dashboard"
                        onSubmit={addMeal}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Create