import { getSession } from 'next-auth/react'
import { prisma } from '/lib/prisma'

export default async function handler(req, res) {
    // Check if user is authenticated
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    // Update new user info
    if (req.method === 'PATCH') {
        try {
            const { username, image } = req.body

            // Retrieve the current authenticated user
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
            })

            const updateUser = await prisma.user.update({
                where: { email: session.user.email },
                data: {
                    username: username,
                    image: image,
                },
            })
            res.status(200).json(updateUser)
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
    else {
        res.setHeader('Allow', ['PATCH']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}