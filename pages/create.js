import Layout from '/components/Layout'
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
        session,
        props: {
            users: JSON.parse(JSON.stringify(users)),
            // organizer: JSON.parse(JSON.stringify(organizer))
        }
    }
}

const Create = ({ session, props}) => {
    const addMeal = (data) => axios.post('/api/meals', data);

    return (
        <Layout>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-xl font-medium text-gray-800">List your hunger</h1>
                <p className="text-gray-500">
                    Fill out the form below to start a new meal.
                </p>
                <div className="mt-8">
                    <MealCreationForm
                        buttonText="Add meal"
                        redirectPath="/meals"
                        users={props.users}
                        organizer={session.user.id}
                        onSubmit={addMeal}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Create