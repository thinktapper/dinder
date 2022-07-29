import Layout from '/components/Layout'
import Script from 'next/script'
import ListingForm from '/components/ListingForm'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'

export async function getServerSideProps(context) {
  // Get user
  const session = await getSession(context)
  const userEmail = session.user.email
  // Get all users
  const users = await prisma.user.findMany()
  // Pass the data to the ListingForm
  return {
    props: {
      userEmail: JSON.parse(JSON.stringify(userEmail)),
      users: JSON.parse(JSON.stringify(users)),
    },
  }
}

const Create = ({ userEmail, users }) => {
  const addMeal = data => {
    console.log(data)
    axios.post('/api/meals', data)
  }
  // const session = props.session
  // const user = session.userId

  return (
    <Layout>
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgNo6ibYDfbtoLpNN23JZ0zgC4b1ntDGY&libraries=places" />
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your hunger</h1>
        <p className="text-gray-500">
          Fill out the form below to start a new meal.
        </p>
        <div className="mt-8">
          <ListingForm
            users={users}
            userId={userEmail}
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
