import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'

export default function Meal(){
  const restaurants = [
    {
      "id": "001",
      "image": "https://imgur.com/OckVkRo.jpg",
      "name": "HasCheesBurgers",
      "description": "After deciding if canHasCheesburger, get off your can and can-can on down to HasCheeseburger for all your cheeseburger needs.",
      "cuisine": "American",
      "price": "$$",
      "lat": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "002",
      "image": "https://imgur.com/oPj4A8u.jpg",
      "name": "Luxury houseboat",
      "description": "Sat three ready meat myself tonight replied terrible town anybody.",
      "cuisine": "Mexican",
      "price": "$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "003",
      "image": "https://imgur.com/Q9WPlWA.jpg",
      "name": "Fishi Sushi",
      "description": "The fishiest Sushi around. Just follow your nose to Fishi Sushi. From the moment you walk in you will think to yourself, 'Something smells Fishi'.",
      "cuisine": "Asian",
      "price": "$$$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    },
    {
      "id": "004",
      "image": "https://imgur.com/wDmRJPc.jpg",
      "name": "The Mill",
      "description": "Extremity direction existence as dashwoods do up. Securing marianne led welcomed offended but offering six raptures.",
      "cuisine": "American",
      "price": "$$$",
      "lat": 42.0,
      "long": 42.0,
      "address": "123 Test Lane"
    }
  ]

  const [lastDirection, setLastDirection] = useState('')

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = name => {
    console.log('removing: ' + name)
  }


  return (
    // <div className='bg-transparent'>
    //   <div className='flex flex-col items-center justify-center w-2/3 h-full'>
    //     <div className='w-96 h-{650}'>
      <>
          {/* {restaurants?.map(restaurant =>
            <TinderCard className="absolute" key={restaurant.id} onSwipe={(dir) => swiped(dir, restaurant.id)} onCardLeftScreen={() => outOfFrame(restaurant.name)}>
              <div className="w-96 h-{650} bg-cover bg-center shadow-md rounded-lg overflow-hidden">
                <Image className='absolute top-0 w-full h-full rounded-xl' src={restaurant.image} alt={restaurant.name} width={320} height={240} />
                <h3 className="p-4 mt-0 text-xl font-bold text-center">{restaurant.name}</h3>
              </div>
            </TinderCard>

          )} */}

          <div className="w-[375px] h-[667px] relative overflow-hidden bg-white">
  <div className="w-[1177.77px] h-[605.34px]">
    <div className="w-[341px] h-[518px] absolute left-[-394px] top-[153.65px]">
      <img
        src={restaurants[0].image}
        className="w-[341px] h-[424px] absolute left-[-1px] top-[-1px] rounded-tl-[20px] rounded-tr-[20px] object-none"
      />
      <div className="w-[290px] h-[23px]">
        <p className="w-[152px] h-[23px] absolute left-[163px] top-[378px] text-2xl font-bold text-right text-white">
          <span className="w-[152px] h-[23px] text-2xl font-bold text-right text-white">
            150K ₸/
          </span>
          <span className="w-[152px] h-[23px] text-2xl font-bold text-right lowercase text-white">
            мес
          </span>
        </p>
        <div className="w-[110px] h-[18px]" />
      </div>
      <div className="w-[341px] h-[94px]">
        <div className="w-[341px] h-[94px] absolute left-[-0.5px] top-[423.5px] rounded-bl-[20px] rounded-br-[20px] bg-[#5b4ac5]" />
        <div className="w-[65.19px] h-[53.87px] absolute left-[25.07px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            2 ком
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[100.29px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-center text-white">
            <span className="w-[65px] h-[21px] text-sm text-center text-white">125 м</span>
            <span className="w-[65px] h-[21px] text-lg text-center text-white">2</span>
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[175.51px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            1 сан
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[250.74px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            ~203 м
          </p>
        </div>
      </div>
    </div>
    <div className="w-[341px] h-[518px] absolute left-[16.65px] top-[117.72px]">
      <img
        src={restaurants[1].image}
        className="w-[341px] h-[424px] absolute left-[-1px] top-[-1px] rounded-tl-[20px] rounded-tr-[20px] object-none"
      />
      <div className="w-[290px] h-[23px]">
        <p className="w-[152px] h-[23px] absolute left-[163px] top-[378px] text-2xl font-bold text-right text-white">
          <span className="w-[152px] h-[23px] text-2xl font-bold text-right text-white">
            250K ₸/
          </span>
          <span className="w-[152px] h-[23px] text-2xl font-bold text-right lowercase text-white">
            мес
          </span>
        </p>
        <svg
          width={111}
          height={19}
          viewBox="0 0 111 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[110px] h-[18px]"
          preserveAspectRatio="none"
        >
          <g clip-path="url(#clip0_1_162)">
            <path
              d="M9.645 4.13999L10.7872 7.99293L10.8899 8.3395L11.2512 8.35059L15.6576 8.48579L12.1616 10.7968L11.8487 11.0036L11.9597 11.3618L13.2193 15.4275L9.95347 12.9781L9.66616 12.7626L9.37021 12.9661L6.09959 15.2146L7.31531 11.5674L7.43278 11.2151L7.12931 11.0008L3.58747 8.50073L7.97701 8.40382L8.33795 8.39585L8.44394 8.05073L9.645 4.13999Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M17.5285 8.03433L11.4816 8.03433L9.65347 2.40933L7.82535 8.03433L1.77847 8.03433L6.70035 11.4093L4.80191 17.0343L9.65347 13.5187L14.505 17.0343L12.6066 11.4093L17.5285 8.03433Z"
              fill="white"
              stroke="white"
              stroke-linejoin="round"
            />
          </g>
          <g clip-path="url(#clip1_1_162)">
            <path
              d="M32.645 4.13999L33.7872 7.99293L33.8899 8.3395L34.2512 8.35059L38.6576 8.48579L35.1616 10.7968L34.8487 11.0036L34.9597 11.3618L36.2193 15.4275L32.9535 12.9781L32.6662 12.7626L32.3702 12.9661L29.0996 15.2146L30.3153 11.5674L30.4328 11.2151L30.1293 11.0008L26.5875 8.50073L30.977 8.40382L31.3379 8.39585L31.4439 8.05073L32.645 4.13999Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M40.5285 8.03433L34.4816 8.03433L32.6535 2.40933L30.8253 8.03433L24.7785 8.03433L29.7003 11.4093L27.8019 17.0343L32.6535 13.5187L37.505 17.0343L35.6066 11.4093L40.5285 8.03433Z"
              fill="white"
              stroke="white"
              stroke-linejoin="round"
            />
          </g>
          <g clip-path="url(#clip2_1_162)">
            <path
              d="M55.645 4.13999L56.7872 7.99293L56.8899 8.3395L57.2512 8.35059L61.6576 8.48579L58.1616 10.7968L57.8487 11.0036L57.9597 11.3618L59.2193 15.4275L55.9535 12.9781L55.6662 12.7626L55.3702 12.9661L52.0996 15.2146L53.3153 11.5674L53.4328 11.2151L53.1293 11.0008L49.5875 8.50073L53.977 8.40382L54.3379 8.39585L54.4439 8.05073L55.645 4.13999Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M63.5285 8.03433L57.4816 8.03433L55.6535 2.40933L53.8253 8.03433L47.7785 8.03433L52.7003 11.4093L50.8019 17.0343L55.6535 13.5187L60.505 17.0343L58.6066 11.4093L63.5285 8.03433Z"
              fill="white"
              stroke="white"
              stroke-linejoin="round"
            />
          </g>
          <g clip-path="url(#clip3_1_162)">
            <path
              d="M78.645 4.13999L79.7872 7.99293L79.8899 8.3395L80.2512 8.35059L84.6576 8.48579L81.1616 10.7968L80.8487 11.0036L80.9597 11.3618L82.2193 15.4275L78.9535 12.9781L78.6662 12.7626L78.3702 12.9661L75.0996 15.2146L76.3153 11.5674L76.4328 11.2151L76.1293 11.0008L72.5875 8.50073L76.977 8.40382L77.3379 8.39585L77.4439 8.05073L78.645 4.13999Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M86.5285 8.03433L80.4816 8.03433L78.6535 2.40933L76.8253 8.03433L70.7785 8.03433L75.7003 11.4093L73.8019 17.0343L78.6535 13.5187L83.505 17.0343L81.6066 11.4093L86.5285 8.03433Z"
              fill="white"
              stroke="white"
              stroke-linejoin="round"
            />
          </g>
          <g clip-path="url(#clip4_1_162)">
            <path
              d="M101.645 4.13999L102.787 7.99293L102.89 8.3395L103.251 8.35059L107.658 8.48579L104.162 10.7968L103.849 11.0036L103.96 11.3618L105.219 15.4275L101.953 12.9781L101.666 12.7626L101.37 12.9661L98.0996 15.2146L99.3153 11.5674L99.4328 11.2151L99.1293 11.0008L95.5875 8.50073L99.977 8.40382L100.338 8.39585L100.444 8.05073L101.645 4.13999Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M109.528 8.03433L103.482 8.03433L101.653 2.40933L99.8253 8.03433L93.7785 8.03433L98.7003 11.4093L96.8019 17.0343L101.653 13.5187L106.505 17.0343L104.607 11.4093L109.528 8.03433Z"
              fill="white"
              stroke="white"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clippath id="clip0_1_162">
              <rect width={18} height={18} fill="white" transform="translate(0.653473 0.721832)" />
            </clippath>
            <clippath id="clip1_1_162">
              <rect width={18} height={18} fill="white" transform="translate(23.6535 0.721832)" />
            </clippath>
            <clippath id="clip2_1_162">
              <rect width={18} height={18} fill="white" transform="translate(46.6535 0.721832)" />
            </clippath>
            <clippath id="clip3_1_162">
              <rect width={18} height={18} fill="white" transform="translate(69.6535 0.721832)" />
            </clippath>
            <clippath id="clip4_1_162">
              <rect width={18} height={18} fill="white" transform="translate(92.6535 0.721832)" />
            </clippath>
          </defs>
        </svg>
      </div>
      <div className="w-[341px] h-[94px]">
        <div className="w-[341px] h-[94px] absolute left-[-0.5px] top-[423.5px] rounded-bl-[20px] rounded-br-[20px] bg-[#5b4ac5]" />
        <div className="w-[65.19px] h-[53.87px] absolute left-[25.07px] top-[444.07px] overflow-hidden">
          <svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 w-6 h-6 left-5"
            preserveAspectRatio="xMidYMid meet"
          >
            <g clip-path="url(#clip0_1_1320)">
              <g filter="url(#filter0_d_1_1320)">
                <path
                  d="M8.72702 3.78925C7.61902 3.78925 6.72702 4.68125 6.72702 5.78925L6.72702 21.7892L18.727 21.7892L18.727 5.78925C18.727 4.68125 17.835 3.78925 16.727 3.78925L8.72702 3.78925ZM8.72702 5.78925L16.727 5.78925L16.727 19.7892L8.72702 19.7892L8.72702 5.78925ZM13.727 11.7892L13.727 13.7892L15.727 13.7892L15.727 11.7892L13.727 11.7892Z"
                  fill="white"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_1_1320"
                x="-1.27298"
                y="-4.21075"
                width={28}
                height={34}
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feflood flood-opacity={0} result="BackgroundImageFix" />
                <fecolormatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feoffset />
                <fegaussianblur stdDeviation={4} />
                <fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feblend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_1320"
                />
                <feblend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_1320"
                  result="shape"
                />
              </filter>
              <clippath id="clip0_1_1320">
                <rect width={24} height={24} fill="white" transform="translate(0.72702 0.789246)" />
              </clippath>
            </defs>
          </svg>
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            2 ком
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[100.29px] top-[444.07px] overflow-hidden">
          <svg
            width={38}
            height={32}
            viewBox="0 0 38 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 w-6 h-6 left-5"
            preserveAspectRatio="xMidYMid meet"
          >
            <g filter="url(#filter0_d_1_1314)">
              <path
                d="M29.5575 7.83924L23.9475 2.17924C23.8541 2.08656 23.7433 2.01323 23.6215 1.96347C23.4996 1.9137 23.3692 1.88848 23.2375 1.88924C22.9752 1.89034 22.7238 1.99449 22.5375 2.17924L8.33755 16.3292C8.15129 16.5166 8.04675 16.7701 8.04675 17.0342C8.04675 17.2984 8.15129 17.5519 8.33755 17.7392L13.9975 23.3992C14.091 23.4919 14.2018 23.5652 14.3236 23.615C14.4455 23.6648 14.5759 23.69 14.7075 23.6892C14.9699 23.6881 15.2213 23.584 15.4075 23.3992L18.2375 20.5692L26.7275 12.0792L29.5575 9.24924C29.7438 9.06188 29.8483 8.80842 29.8483 8.54424C29.8483 8.28005 29.7438 8.0266 29.5575 7.83924V7.83924ZM26.0175 9.95924L25.3075 9.24924C25.1202 9.06299 24.8667 8.95845 24.6025 8.95845C24.3384 8.95845 24.0849 9.06299 23.8975 9.24924C23.8038 9.3422 23.7294 9.4528 23.6787 9.57466C23.6279 9.69652 23.6017 9.82723 23.6017 9.95924C23.6017 10.0912 23.6279 10.222 23.6787 10.3438C23.7294 10.4657 23.8038 10.5763 23.8975 10.6692L24.6075 11.3792L23.1875 12.7892L21.0675 10.6692C20.8762 10.5054 20.6302 10.4198 20.3785 10.4295C20.1268 10.4392 19.8881 10.5436 19.71 10.7217C19.5319 10.8998 19.4276 11.1385 19.4178 11.3902C19.4081 11.6419 19.4937 11.8879 19.6575 12.0792L21.7775 14.1992L20.3575 15.6192L19.6575 14.9092C19.4692 14.7209 19.2138 14.6151 18.9475 14.6151C18.6812 14.6151 18.4258 14.7209 18.2375 14.9092C18.0492 15.0975 17.9435 15.3529 17.9435 15.6192C17.9435 15.8855 18.0492 16.1409 18.2375 16.3292L18.9475 17.0292L17.5375 18.4492L15.4075 16.3292C15.2202 16.143 14.9667 16.0384 14.7025 16.0384C14.4384 16.0384 14.1849 16.143 13.9975 16.3292C13.8113 16.5166 13.7068 16.7701 13.7068 17.0342C13.7068 17.2984 13.8113 17.5519 13.9975 17.7392L16.1175 19.8592L14.7075 21.2792L10.4575 17.0292L23.1875 4.29924L27.4375 8.54924L26.0175 9.95924Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1_1314"
                x="0.0467529"
                y="-6.11078"
                width="37.8016"
                height="37.8"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feflood flood-opacity={0} result="BackgroundImageFix" />
                <fecolormatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feoffset />
                <fegaussianblur stdDeviation={4} />
                <fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feblend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_1314"
                />
                <feblend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_1314"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-center text-white">
            <span className="w-[65px] h-[21px] text-sm text-center text-white">125 м</span>
            <span className="w-[65px] h-[21px] text-lg text-center text-white">2</span>
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[175.51px] top-[444.07px] overflow-hidden">
          <svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 w-6 h-6 left-5"
            preserveAspectRatio="xMidYMid meet"
          >
            <g clip-path="url(#clip0_1_1308)">
              <g filter="url(#filter0_d_1_1308)">
                <path
                  d="M9.16818 22.7892L17.1682 22.7892L17.1682 20.2722C18.399 19.4503 19.4081 18.3373 20.1058 17.032C20.8036 15.7267 21.1685 14.2693 21.1682 12.7892L21.1682 4.78925C21.1682 4.25881 20.9575 3.7501 20.5824 3.37503C20.2073 2.99996 19.6986 2.78925 19.1682 2.78925L15.1562 2.78925C14.6278 2.79242 14.1222 3.00453 13.7497 3.37926C13.3772 3.75399 13.1682 4.26089 13.1682 4.78925L13.1682 12.7892L3.16818 12.7892C3.18818 15.8812 5.16818 18.7892 9.16818 20.2722L9.16818 22.7892ZM5.46018 14.7892L18.8762 14.7892C18.595 15.7294 18.1197 16.6001 17.481 17.3451C16.8423 18.0901 16.0544 18.6928 15.1682 19.1142L15.1682 20.7892L11.1682 20.7892L11.1682 19.1142C9.16818 18.7892 6.02618 16.7022 5.46018 14.7892ZM15.1682 4.78925L19.1682 4.78925L19.1682 12.7892L15.1682 12.7892L15.1682 4.78925ZM16.1682 5.78925L16.1682 8.78925L18.1682 8.78925L18.1682 5.78925L16.1682 5.78925Z"
                  fill="white"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_1_1308"
                x="-4.83182"
                y="-5.21075"
                width={34}
                height={36}
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feflood flood-opacity={0} result="BackgroundImageFix" />
                <fecolormatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feoffset />
                <fegaussianblur stdDeviation={4} />
                <fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feblend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_1308"
                />
                <feblend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_1308"
                  result="shape"
                />
              </filter>
              <clippath id="clip0_1_1308">
                <rect
                  width={24}
                  height={24}
                  fill="white"
                  transform="translate(0.168182 0.789246)"
                />
              </clippath>
            </defs>
          </svg>
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            1 сан
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[250.74px] top-[444.07px] overflow-hidden">
          <svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 w-6 h-6 left-5"
            preserveAspectRatio="none"
          >
            <g clip-path="url(#clip0_1_1301)">
              <g filter="url(#filter0_d_1_1301)">
                <path
                  d="M12.3888 3.03925C8.66222 3.03925 5.63878 5.9169 5.63878 9.46112C5.63878 13.5392 10.1388 20.0019 11.7911 22.2341C11.8597 22.3283 11.9496 22.405 12.0535 22.4579C12.1573 22.5107 12.2722 22.5383 12.3888 22.5383C12.5053 22.5383 12.6202 22.5107 12.7241 22.4579C12.828 22.405 12.9178 22.3283 12.9864 22.2341C14.6388 20.0028 19.1388 13.5425 19.1388 9.46112C19.1388 5.9169 16.1153 3.03925 12.3888 3.03925Z"
                  stroke="white"
                  stroke-width={3}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter1_d_1_1301)">
                <path
                  d="M12.3888 12.0392C13.6314 12.0392 14.6388 11.0319 14.6388 9.78925C14.6388 8.5466 13.6314 7.53925 12.3888 7.53925C11.1461 7.53925 10.1388 8.5466 10.1388 9.78925C10.1388 11.0319 11.1461 12.0392 12.3888 12.0392Z"
                  stroke="white"
                  stroke-width={2}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_1_1301"
                x="-3.86122"
                y="-6.46075"
                width="32.5"
                height="38.499"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feflood flood-opacity={0} result="BackgroundImageFix" />
                <fecolormatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feoffset />
                <fegaussianblur stdDeviation={4} />
                <fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feblend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_1301"
                />
                <feblend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_1301"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_d_1_1301"
                x="1.13878"
                y="-1.46075"
                width="22.5"
                height="22.5"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feflood flood-opacity={0} result="BackgroundImageFix" />
                <fecolormatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feoffset />
                <fegaussianblur stdDeviation={4} />
                <fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feblend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1_1301"
                />
                <feblend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1_1301"
                  result="shape"
                />
              </filter>
              <clippath id="clip0_1_1301">
                <rect
                  width={24}
                  height={24}
                  fill="white"
                  transform="translate(0.388779 0.789246)"
                />
              </clippath>
            </defs>
          </svg>
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            ~203 м
          </p>
        </div>
      </div>
    </div>
    <div className="w-[341px] h-[518px] absolute left-[447.88px] top-[116.13px]">
      <img
        src={restaurants[2].image}
        className="w-[341px] h-[424px] absolute left-[-1px] top-[-1px] rounded-tl-[20px] rounded-tr-[20px] object-none"
      />
      <div className="w-[290px] h-[23px]">
        <p className="w-[152px] h-[23px] absolute left-[163px] top-[378px] text-2xl font-bold text-right text-white">
          <span className="w-[152px] h-[23px] text-2xl font-bold text-right text-white">
            325K ₸/
          </span>
          <span className="w-[152px] h-[23px] text-2xl font-bold text-right lowercase text-white">
            мес
          </span>
        </p>
        <div className="w-[110px] h-[18px]" />
      </div>
      <div className="w-[341px] h-[94px]">
        <div className="w-[341px] h-[94px] absolute left-[-0.5px] top-[423.5px] rounded-bl-[20px] rounded-br-[20px] bg-[#5b4ac5]" />
        <div className="w-[65.19px] h-[53.87px] absolute left-[25.07px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            2 ком
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[100.29px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-center text-white">
            <span className="w-[65px] h-[21px] text-sm text-center text-white">125 м</span>
            <span className="w-[65px] h-[21px] text-lg text-center text-white">2</span>
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[175.51px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            1 сан
          </p>
        </div>
        <div className="w-[65.19px] h-[53.87px] absolute left-[250.74px] top-[444.07px] overflow-hidden">
          <div className="absolute top-0 w-6 h-6 left-5" />
          <p className="w-[65px] h-[21px] absolute left-0 top-[30px] text-sm text-center text-white">
            ~203 м
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
      </>
    //       <div className="absolute bottom-0 p-2.5">
    //
    //       </div>
    //     </div>
    //
    //   </div>
    // </div>
)}