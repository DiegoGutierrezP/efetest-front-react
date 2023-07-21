import { useState, useContext } from 'react';
import { Button, Collapse, IconButton, Navbar } from "@material-tailwind/react"
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context';

export const MyNavbar = () => {
    const { logout,name,rol } = useContext(AuthContext);
    const [openNav, setOpenNav] = useState(false);
    
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className='flex items-center '>
          <NavLink to={'/'} className={'text-xl font-bold'} >
              Efe Test
          </NavLink>
          <div className='flex flex-col text-sm ml-10 font-medium'>
              <span>User: {name}</span>
              <span>Rol: {rol === 1 ? 'Admin' : 'Merchant'}</span>
          </div>
        </div>
        
        <Button onClick={logout} variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Sign out</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto mt-8">
          <Button onClick={logout} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Sing out</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  )
}
