import { Switch } from 'react-router'
import { AuthProvider } from './Context'
import AppRoute from './components/AppRoutes'
import routes from './config/routes.js'
function App() {
  return (
    <AuthProvider>
      {/* <div className='container mx-auto '>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/firebase'>
            <FirebaseHome />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path='/localstorage'>
            <LocalStorage />
          </Route>
          <Route exact path='/localfile'>
            <LocalFile />
          </Route>
          <Route exact path='/users/home'>
            <Mongodbhome />
          </Route>
        </Switch>
      </div> */}
      <Switch>
        {routes.map((route) => (
          <AppRoute
            key={route.path}
            exact
            path={route.path}
            component={route.component}
            isPrivate={route.isPrivate}
          />
        ))}
      </Switch>
    </AuthProvider>
  )
}

export default App
