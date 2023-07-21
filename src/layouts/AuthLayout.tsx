import { Outlet } from "react-router-dom"


export const AuthLayout = () => {
    
  return (
    <div className="min-h-screen p-4 bg-gray-100 flex items-center justify-center">
        <Outlet />
    </div>
  )
}
