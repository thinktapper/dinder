// import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '/components/Card'
import { ExclamationIcon } from '@heroicons/react/outline'
// import axios from 'axios'
// import toast from 'react-hot-toast'

const Grid = ({ meals = [] }) => {
    const isEmpty = meals.length === 0

    return isEmpty ? (
        <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
            <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
            <span>Unfortunately, there is nothing to display yet.</span>
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