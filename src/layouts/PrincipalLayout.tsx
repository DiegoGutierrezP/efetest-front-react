import { Outlet } from 'react-router-dom';
import { MyNavbar } from '.';

export const PrincipalLayout = () => {
  return (
    <div className="min-h-screen p-4 bg-blue-100 ">
        <MyNavbar/>
        <div className='mx-auto max-w-screen-xl p-5'>
            <Outlet />

        </div>
    </div>
  )
}
