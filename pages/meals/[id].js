import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '/components/Layout'
import RestaurantCards from '/components/RestaurantCards'
import { prisma } from '/lib/prisma'

export async function getStaticPaths() {
    // Get all the meals IDs from the database
    const meals = await prisma.meal.findMany({
        select: { id: true },
    })

    return {
        paths: meals.map(meal => ({
            params: { id: meal.id },
        })),
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    // Get the current meal from the database
    const meal = await prisma.meal.findUnique({
        where: { id: params.id },
    })

    if (meal) {
        return {
            props: JSON.parse(JSON.stringify(meal)),
        }
    }

    return {
        redirect: {
            destination: '/dashboard',
            permanent: false,
        },
    }
}

const JoinedMeal = (meal = null) => {
    const router = useRouter()

    const { data: session } = useSession()

    const [isOrganizer, setIsOrganizer] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        (async () => {
            if (session?.user) {
                try {
                    const organizer = await axios.get(`/api/meals/${meal.id}/organizer`)
                    setIsOrganizer(organizer?.id === session.user.id)
                }catch (e) {
                    setIsOrganizer(false)
                }
            }
        })()
    }, [session?.user])

    const deleteMeal = async () => {
        let toastId
        try {
            toastId = toast.loading('Deleting...')
            setDeleting(true)
            // Delete meal from DB
            await axios.delete(`/api/meals/${meal.id}`)
            // Redirect user
            toast.success('Successfully deleted', { id: toastId })
            await router.push('/dashboard')
        }catch (e) {
            console.log(e)
            toast.error('Unable to delete meal', { id: toastId})
            setDeleting(false)
        }
    }

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
                    <div>
                        <h1 className="text-2xl font-semibold truncate">
                            {meal?.name ?? ''}
                        </h1>
                        <ol className="inline-flex items-center space-x-1 text-gray-500">
                            <li>
                                <span>{meal?.voteDate ?? 0} date</span>
                                <span aria-hidden="true"> · </span>
                            </li>
                            <li>
                                <span>{meal?.endDate ?? 0} end</span>
                                <span aria-hidden="true"> · </span>
                            </li>
                            <li>
                                <span>{meal?.distance ?? 0} radius</span>
                            </li>
                        </ol>
                    </div>

                    {isOrganizer ? (
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={() => router.push(`/meals/${meal.id}/edit`)}
                                className="px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={deleteMeal}
                                className="rounded-md border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none transition disabled:bg-rose-500 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    ) : null}
                </div>

                <div className="mt-6 relative aspect-video bg-gray-200 rounded-lg shadow-md overflow-hidden">
                    {meal?.image ? (
                        <Image
                            src={meal.image}
                            alt={meal.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    ) : null}
                </div>

                <p className="mt-8 text-lg">{meal?.description ?? ''}</p>

                <div className="mt-8">
                    <RestaurantCards meal={meal} />
                </div>
            </div>
        </Layout>
    )
}

export default JoinedMeal