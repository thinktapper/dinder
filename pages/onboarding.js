import axios from 'axios'
import { getSession } from 'next-auth/react'
import Layout from '/components/Layout'
import UserForm from '/components/UserForm'

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

    return {
        props: session,
    }
}

const onboarding = () => {
    const addUser = data => axios.patch('/api/user', data)

    return (
        <Layout>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-xl font-medium text-gray-800">Creat your account</h1>
                <p className="text-gray-500">
                    Fill out the form below to update user info.
                </p>
                <div className="mt-8">
                    <UserForm
                        buttonText="Update Info"
                        redirectPath="/"
                        onSubmit={addUser}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default onboarding