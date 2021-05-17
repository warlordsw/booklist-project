import FirebaseHome from './pages/firebaseHome'
import MongoDBHome from './pages/mongodbHome'
import LocalStorage from './pages/localStorage'
import { Route, Switch } from 'react-router'
import Home from './pages/home'

function App() {
  return (
    <>
      <div className='container mx-auto '>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/firebase'>
            <FirebaseHome />
          </Route>
          <Route exact path='/mongodb'>
            <MongoDBHome />
          </Route>
          <Route exact path='/localstorage'>
            <LocalStorage />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
