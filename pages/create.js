import Layout from '/components/Layout'
import Script from 'next/script'
import MealCreationForm from '/components/MealCreationForm'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'

export async function getServerSideProps(context){
    // Check if user is authenticated
    const session = await getSession(context)

    // If not, redirect to the homepage
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const users = await prisma.user.findMany({
        where: { email: session.user.email },
        select: { friendsList: true },
    })

    // const organizer = await prisma.user.findUnique({
    //     where: { email: session.user.email },
    //     select: { id: true },
    // })

    return {
        props: {
            session: session,
            users: JSON.parse(JSON.stringify(users)),
            // organizer: JSON.parse(JSON.stringify(organizer))
        }
    }
}

const Create = ({ ...props }) => {
    const addMeal = (data) => axios.post('/api/meals', data)
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
                    <MealCreationForm
                        buttonText="Add meal"
                        redirectPath="/dashboard"
                        users={props.users}
                        // organizer={user}
                        onSubmit={addMeal}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Create