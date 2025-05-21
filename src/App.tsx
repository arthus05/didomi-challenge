import { Redirect, Route, Switch } from 'wouter'
import { GiveConsent } from './pages/GiveConsent'
import { Consents } from './pages/Consents'

function App() {
  return (
    <main>
      <Switch>
        <Route path='/give-consent' component={GiveConsent} />
        <Route path='/consents' component={Consents} />

        <Route>
          <Redirect to='give-consent' />
        </Route>
      </Switch>
    </main>
  )
}

export default App
