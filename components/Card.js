import Link from 'next/link'
import Image from 'next/image'
import PropTypes from 'prop-types'
// import { HeartIcon } from '@heroicons/react/solid'

const Card = ({
    id = '',
    image = '',
    name = '',
    guests = 0,
    distance = 0,
    voteDate = '',
}) => (
    <Link href={`/meals/${id}`}>
        <a className='block w-full'>
            <div className='relative'>
                <div className='bg-gray-200 rounded-lg shadow overflow-hidden aspect-w-16 aspect-h-9'>
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            layout='fill'
                            objectFit='cover'
                            className='hover:opacity-80 transition'
                        />
                    ) : null}
                </div>
            </div>
            <div className="mt-2 w-full text-gray-700 font-semibold leading-tight">
                {name ?? ''}
            </div>
            <ol className="mt-1 inline-flex items-center space-x-1 text-gray-500">
                <li>
                    <span>{guests ?? 0} guests</span>
                    {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
                    <span aria-label='true'> · </span>
                </li>
                <li>
                    <span>{distance ?? 0} far away</span>
                    {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
                    <span aria-label='true'> · </span>
                </li>
                <li>
                    <span>{voteDate ?? 'Yesterday'} is when</span>
                </li>
            </ol>
        </a>
    </Link>
)

Card.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string,
    guests: PropTypes.number,
    distance: PropTypes.number,
    voteDate: PropTypes.string,
}

export default Card