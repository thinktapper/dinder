import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'

export default async function handler(req, res) {
    // Check if user is authenticated
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    // Retrieve the authenticated user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { joinedMeals: true },
    })

    // Check if authenticated user is the organizer of this meal
    const { id } = req.query
    if(!user?.joinedMeals?.find(meal => meal.id === id)){
        return res.status(401).json({ message: 'Unauthorized.' })
    }

    // Update meal
    if(req.method === 'PATCH'){
        try {
            const meal = await prisma.meal.update({
                where: { id },
                data: req.body,
            })
            res.status(200).json(meal)
        }catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
    // Delete meal
    else if (req.method === 'DELETE'){
        try {
            const meal = await prisma.meal.delete({
                where: { id },
            })
            res.status(200).json(meal)
        }catch (e) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
    // HTTP method not supported!
    else {
        res.setHeader('Allow', ['PATCH']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}