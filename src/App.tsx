import { Redirect, Route, Switch } from 'wouter'
import { GiveConsent } from './pages/GiveConsent/GiveConsent'
import { Consents } from './pages/Consents/Consents'

function App() {
  return (
    <Switch>
      <Route path='/give-consent' component={GiveConsent} />
      <Route path='/consents' component={Consents} />

      <Route>
        <Redirect to='give-consent' />
      </Route>
    </Switch>
  )
}

export default App
