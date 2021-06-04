import FirebaseHome from '../pages/FirebaseHome'
import Home from '../pages/Home'
import LocalFile from '../pages/LocalFile'
import LocalStorage from '../pages/LocalStorage'
import Login from '../pages/Login'
import MongodbHome from '../pages/MongodbHome'
import Register from '../pages/Register'

const routes = [
  {
    path: '/firebase',
    component: FirebaseHome,
    isPrivate: false,
  },
  {
    path: '/',
    component: Home,
    isPrivate: false,
  },
  {
    path: '/localfile',
    component: LocalFile,
    isPrivate: false,
  },
  {
    path: '/localstorage',
    component: LocalStorage,
    isPrivate: false,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/users/home',
    component: MongodbHome,
    isPrivate: true,
  },
  {
    path: '/register',
    component: Register,
    isPrivate: false,
  },
]

export default routes
