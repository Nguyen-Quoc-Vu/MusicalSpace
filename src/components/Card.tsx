import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setCurrentTrack } from '../redux/actions/currentTrack'
import './styles.css'
interface CardProps {
  thumbnail: string
  title: string
  description?: string
  circle?: boolean
  preview_url?: string
  tracks_href?: string
}
const initialState = {
  thumbnail: '',
  title: '',
  description: '',
  preview_url: undefined,
  tracks_href: '',
}

const Card = ({
  thumbnail,
  title,
  description,
  preview_url,
  tracks_href,
}: CardProps = initialState) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 200)
  }, [])
  const onTrackClick = () => {
    if (preview_url !== undefined && preview_url !== null) {
      console.log(preview_url)
      dispatch(
        setCurrentTrack({
          preview_url: preview_url || '',
          title,
          thumbnail,
          artist: description || '',
        })
      )
    }
    if (tracks_href) {
      history.push('/playlist/' + tracks_href)
    }
  }
  return (
    <div
      className="flex-shrink-0  w-36 sm:w-full group cursor-pointer transform hover:scale-95 duration-200"
      onClick={() => onTrackClick()}
    >
      <div
        className=" rounded-md pb-4 text-gray-200 h-full bg-gray-800 shadow-lg group-hover:bg-gray-700 transition-colors duration-200 ease-in-out"
        // onClick={() => (window.location.href = preview_url || '#')}
      >
        <div className="cursor-pointer  p-2 sm:p-4">
          {isLoaded ? (
            <a className="relative sm:h-48 h-32 w-full flex">
              <img
                src={thumbnail}
                className="object-cover absolute  rounded-lg object-center sm:h-48 h-32 w-full filter  group-hover:opacity-80"
              />
              {/* <div className="items-center flex justify-center  font-bold text-xs absolute bottom-2 rounded-full group-hover:opacity-100 opacity-0 transition ease-in-out duration-200 bg-green-600 h-12 w-12 right-2">
                PLAY
              </div> */}
            </a>
          ) : (
            <div className="h-32 md:h-48 animate-pulse w-full bg-gray-700"></div>
          )}
        </div>
        <div className="space-y-1  px-2 pt-2  font-bold">
          <div
            className={`text-sm   ${
              description ? '' : 'text-center text-base'
            } truncate`}
          >
            {title}
          </div>
          {description ? (
            <div className="text-xs text-gray-400 truncate-2 overflow-ellipsis font-normal ">
              {description}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
