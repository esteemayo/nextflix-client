import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  Error,
  Home,
  Login,
  Register,
  SharedLayout,
  Watch,
} from 'pages/index';

import './app.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route
            index
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route
            path='movies'
            element={
              <AuthRoute>
                <Home type='movies' />
              </AuthRoute>
            }
          />
          <Route
            path='series'
            element={
              <AuthRoute>
                <Home type='series' />
              </AuthRoute>
            }
          />
          <Route
            path='watch'
            element={
              <AuthRoute>
                <Watch />
              </AuthRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
