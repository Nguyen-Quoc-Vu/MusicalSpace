import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loadProfile } from '../redux/actions/profile'
import { RootState } from '../redux/reducers'

export const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentPage = useSelector((state: RootState) => state.currentPage)
  const profile = useSelector((state: RootState) => state.profile.data)
  useEffect(() => {
    dispatch(loadProfile())
  }, [])
  return (
    <div className="flex justify-between items-center bg-gray-900 md:p-2 md:px-4 px-3 py-3">
      <div className="font-bold text-lg md:text-lg flex space-x-6 text-gray-400 cursor-pointer">
        <div
          className={
            currentPage === 'search' ? 'text-gray-50 ' : 'hover:text-gray-300'
          }
          onClick={() => history.push('/search')}
        >
          Tìm kiếm
        </div>
        <div
          className={
            currentPage === 'browse' ? 'text-gray-50' : 'hover:text-gray-300'
          }
          onClick={() => history.push('/')}
        >
          Trang chủ
        </div>
      </div>
      <div
        className="flex text-gray-200 items-center space-x-2 transition-colors md:hover:bg-green-700 md:bg-green-800 py-1 pl-2 pr-3 rounded-full cursor-pointer"
        onClick={() => history.push('/profile')}
      >
        <img src={profile.images[0].url} className="rounded-full h-8 " />
        <div className="font-bold text-xs hidden md:block">
          {String(profile.display_name).split(' ')[0]}
        </div>
      </div>
    </div>
  )
}
