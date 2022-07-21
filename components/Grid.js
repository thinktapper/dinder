// import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Card from '/components/Card'
import { ExclamationIcon } from '@heroicons/react/outline'
// import axios from 'axios'
// import toast from 'react-hot-toast'

const Grid = ({ meals = [] }) => {
    const router = useRouter()
    const isEmpty = meals.length === 0

    return isEmpty ? (
        <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
            <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
            <span>Unfortunately, there is nothing to display yet.</span>
            <button
                className="mt-6 w-full bg-rose-600 text-white py-2 px-8 rounded-md"
                onClick={router.push('/create')}>
                Create a Meal
            </button>
        </p>
    ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map(meal => (
                <Card
                    key={meal.id}
                    {...meal}
                />
            ))}
        </div>
    )
}

Grid.propTypes = {
    meals: PropTypes.array,
}

export default Grid