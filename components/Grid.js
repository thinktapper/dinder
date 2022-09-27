// import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Card from '/components/Card'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import axios from 'axios'
// import toast from 'react-hot-toast'

const Grid = ({ herds = [] }) => {
  const router = useRouter()
  const isEmpty = herds.length === 0

  return isEmpty ? (
    <p className="inline-flex items-center px-4 py-2 space-x-1 rounded-md text-amber-700 bg-amber-100 max-w-max">
      <ExclamationTriangleIcon className="w-5 h-5 mt-px shrink-0" />
      <span>Unfortunately, there is nothing to display yet.</span>
      <button
        className="w-full px-8 py-2 mt-6 text-white rounded-md bg-rose-600"
        onClick={() => router.push('/create')}>
        Form a Herd
      </button>
    </p>
  ) : (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {herds.map(herd => (
        <Card key={herd.id} {...herd} />
      ))}
    </div>
  )
}

Grid.propTypes = {
  herds: PropTypes.array,
}

export default Grid
