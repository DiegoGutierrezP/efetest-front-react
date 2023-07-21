import { Navigate, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from '../pages';
import { AuthLayout, PrincipalLayout } from "../layouts";
import { useContext } from 'react';
import { AuthContext } from "../context";

export const AppRouter = () => {
  const {status} = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout/>,
      loader: async () => {
        if(status === 'authenticated'){
          return redirect("/");
        }
        return null;
      },
      children:[
        {
          path: "login",
          element: <LoginPage/>,
        },
        {
          path: "register",
          element: <RegisterPage/>,
        },
        { path: '*', element: <Navigate to="login" /> },
      ]
    },
    {
      path: "/",
      element: <PrincipalLayout/>,
      loader: async () => {
        if(status === 'no-authenticated'){
          return redirect("/auth/login");
        }
        return null;
      },
      children:[
        {
          path: "",
          element: <HomePage/>,
        },
        {
          path: "yeye",
          element: <h1>yeye</h1>,
        }
      ]
    },
    {
      path: '*',
      element: <h1>Not found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}
