import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setPage } from '../../redux/actions/currentPage'
import { loadProfile } from '../../redux/actions/profile'
import { RootState } from '../../redux/reducers'

interface Props {
  isValidSession: () => boolean
}

const Profile = ({ isValidSession }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const profile = useSelector((state: RootState) => state.profile.data)
  useEffect(() => {
    dispatch(loadProfile())
    dispatch(setPage('profile'))
    console.log(profile)
  }, [])
  const onLogoutButtonClick = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.clear()
      history.push('/auth')
    }
  }
  return isValidSession() ? (
    <div>
      <div className="flex flex-col justify-center items-center space-y-4 py-5">
        <div className="relative h-40 w-40 flex justify-center">
          <img
            src={profile.images[0].url}
            className="rounded-full h-40 absolute"
          />
        </div>
        <div className="text-gray-100 rounded-full text-3xl font-bold">
          {profile.display_name}
        </div>

        <div
          onClick={() => onLogoutButtonClick()}
          className="text-gray-200 rounded-md text-sm font-bold py-2 px-8 text-gray-100 bg-red-600 hover:bg-red-500 cursor-pointer"
        >
          Đăng xuất
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Profile
