import Layout from '/components/Layout'
import MealCreationForm from '/components/MealCreationForm'
import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'
import axios from 'axios'

export async function getServerSideProps(context) {
    const session = await getSession(context);

    const redirect = {
        redirect: {
            destination: '/dashboard',
            permanent: false,
        },
    };

    // Check if the user is authenticated
    if (!session) {
        return redirect;
    }

    // Retrieve the authenticated user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { joinedMeals: true },
    });

    // Check if authenticated user is the organizer of this meal
    const id = context.params.id;
    const meal = user?.joinedMeals?.find(meal => meal.id === id);
    if (!meal) {
        return redirect;
    }

    return {
        props: JSON.parse(JSON.stringify(meal)),
    };
}

const Edit = (meal = null) => {
    const handleOnSubmit = data => axios.patch(`/api/meals/${meal.id}`, data);

    return (
        <Layout>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-xl font-medium text-gray-800">Edit your meal</h1>
                <p className="text-gray-500">
                    Fill out the form below to update your meal.
                </p>
                <div className="mt-8">
                    {meal ? (
                        <MealCreationForm
                            initialValues={meal}
                            buttonText="Update meal"
                            redirectPath={`/meals/${meal.id}`}
                            onSubmit={handleOnSubmit}
                        />
                    ) : null}
                </div>
            </div>
        </Layout>
    );
};

export default Edit;