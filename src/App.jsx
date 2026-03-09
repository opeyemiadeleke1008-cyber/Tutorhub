import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import NewsletterPage from './pages/NewsletterPage'
import ContactPage from './pages/ContactPage'
import SignInPage from './pages/SignInPage'
import UserSignIn from './pages/usersignin'
import TutorSignIn from './pages/tutorsignin'
import AdminSignIn from './pages/adminsignin'
import NotFound from './ui/NotFound'
import ScrollToTop from './ui/ScrollToTop'
import UserDashboard from './pages/UserDashboard'
import Tutors from './pages/Tutors'
import UserBookings from './pages/UserBookings'
import UserProfile from './pages/UserProfile'
import UserMessages from './pages/UserMessages'
import UserProtectedRoute from './routes/UserProtectedRoute'
import TutorDashboard from './pages/TutorDashboard'
import TutorProtectedRoute from './routes/TutorProtectedRoute'
import TutorBookings from './pages/TutorBookings'
import TutorMessages from './pages/TutorMessages'
import TutorProfile from './pages/TutorProfile'
import TutorReport from './pages/TutorReport'
import AdminDashboard from './pages/AdminDashboard'
import AdminProtectedRoute from './routes/AdminProtectedRoute'
import AdminTutors from './pages/AdminTutors'
import AdminReports from './pages/AdminReports'
import AdminSettings from './pages/AdminSettings'
import UserReport from './pages/UserReport'
import LikedTutors from './pages/LikedTutors'

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/usersignin" element={<UserSignIn />} />
        <Route path="/tutorsignin" element={<TutorSignIn />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />

        {/* User Routes (Protected) */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/userbookings" element={<UserBookings />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/usermessages" element={<UserMessages />} />
          <Route path="/userreport" element={<UserReport />} />
          <Route path="/likedtutors" element={<LikedTutors />} />
        </Route>

        {/* Tutor Routes (Protected) */}
        <Route element={<TutorProtectedRoute />}>
          <Route path="/tutordashboard" element={<TutorDashboard />} />
          <Route path="/tutorbookings" element={<TutorBookings />} />
          <Route path="/tutormessages" element={<TutorMessages />} />
          <Route path="/tutorprofile" element={<TutorProfile />} />
          <Route path="/tutorreport" element={<TutorReport />} />
        </Route>

        {/* Admin Routes (Protected) */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admintutors" element={<AdminTutors />} />
          <Route path="/adminreports" element={<AdminReports />} />
          <Route path="/adminsettings" element={<AdminSettings />} />
        </Route>

        {/* Other Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
