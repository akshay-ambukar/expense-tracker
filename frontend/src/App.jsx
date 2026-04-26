import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage, SignupPage, HomePage, HistoryPage, DashboardPage } from './pages'
import { PublicRoute, ProtectedRoute } from './components'

const router = createBrowserRouter([
  {
    // Public routes
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
    ]
  },
  {
    // Protected routes
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
