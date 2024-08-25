import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import WatchPage from './pages/WatchPage'
import HomePage from './pages/home/HomePage'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import Footer from './components/Footer'
import { useAuthStore } from './store/authUser'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { Loader } from "lucide-react";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck();
  }, []);

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to={"/"}/>} />
      <Route path="/signup" element={ !user ? <SignUpPage /> : <Navigate to={"/"}/>} />
      <Route path="/watch/:id" element={ user ? <WatchPage /> : <Navigate to={"/login"}/>} />
      <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />    
      <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />    
    </Routes>
    <Footer />
    <Toaster />
    </>
  )
}

export default App
