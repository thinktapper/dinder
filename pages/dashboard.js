import { getSession } from 'next-auth/react'
import Layout from '/components/Layout'
import Grid from '/components/Grid'
import { prisma } from '/lib/prisma'

export async function getServerSideProps(context) {
    // Check if user is authenticated
    const session = await getSession(context);

    // If not, redirect to the homepage
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    // Get all meals from the authenticated user
    const meals = await prisma.meal.findMany({
        where: {
            joinedBy: { some: { email: session.user.email } },
        },
        orderBy: { createdAt: 'desc' },
    })

    // Pass the data to the Meals component
    return {
        props: {
            meals: JSON.parse(JSON.stringify(meals))
        },
    }
}

const Dashboard = ({ meals = [] }) => {
    return (
        <Layout>
            <h1 className="text-xl font-medium text-gray-800">Your meals</h1>
            <p className="text-gray-500">
                Manage your meals and update your events
            </p>
            <div className="mt-8">
                <Grid meals={meals} />
            </div>
        </Layout>
    )
}

export default Dashboard