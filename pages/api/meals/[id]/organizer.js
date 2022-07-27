import { prisma } from '/lib/prisma'

export default async function handler(req, res) {
    // Get the meal's organizer
    if (req.method === 'GET') {
        try {
            const { id } = req.query
            const { organizer } = await prisma.meal.findUnique({
                where: { id },
                select: { organizer: true }
            })
            res.status(200).json(organizer)
        }catch (e){
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
    // HTTP method not supported!
    else {
        res.setHeader('Allow', ['GET']);
        res
            .status(405)
            .json({ message: `HTTP method ${req.method} is not supported.` });
    }
}