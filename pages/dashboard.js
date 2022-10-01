import { getSession } from 'next-auth/react'
import Layout from '/components/Layout'
import Grid from '/components/Grid'
import { prisma } from '/lib/prisma'

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context)

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // Get all herds from the authenticated user
  const herds = await prisma.herd.findMany({
    where: { members: { id: session.user.id } },
    orderBy: { createdAt: 'desc' },
  })

  // Pass the data to the Dashboard component
  return {
    props: {
      herds: JSON.parse(JSON.stringify(herds)),
    },
  }
}

const Dashboard = ({ herds = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Your herds</h1>
      <p className="text-gray-500">Manage your herds and update your feasts</p>
      <div className="mt-8">
        <Grid herds={herds} />
      </div>
    </Layout>
  )
}

export default Dashboard
