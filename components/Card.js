import Link from 'next/link'
import Image from 'next/image'
import PropTypes from 'prop-types'
// import { HeartIcon } from '@heroicons/react/solid'

const Card = ({
  id = '',
  image = '',
  name = '',
  members = [],
  feasts = [],
  startDate = '',
}) => (
  <Link href={`/herds/${id}`}>
    <a className="block w-full">
      <div className="relative">
        <div className="overflow-hidden bg-gray-200 rounded-lg shadow aspect-w-16 aspect-h-9">
          {image ? (
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="transition hover:opacity-80"
            />
          ) : null}
        </div>
      </div>
      <div className="w-full mt-2 font-semibold leading-tight text-gray-700">
        {name ?? ''}
      </div>
      <ol className="inline-flex items-center mt-1 space-x-1 text-gray-500">
        <li>
          <span>{members ?? 0} Members</span>
          {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
          <span aria-label="true"> · </span>
        </li>
        <li>
          <span>{feasts ?? 0} Feasts</span>
          {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
          <span aria-label="true"> · </span>
        </li>
        <li>
          <span>{startDate ?? 'Yesterday'} is when</span>
        </li>
      </ol>
    </a>
  </Link>
)

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  members: PropTypes.array,
  feasts: PropTypes.array,
  startDate: PropTypes.string,
}

export default Card
