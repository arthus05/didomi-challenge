import { Link } from 'wouter'

import './styles.scss'

export const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul>
        <li>
          <Link to='/give-consent'>Give Consent</Link>
        </li>
        <li>
          <Link to='/consents'>Consents</Link>
        </li>
      </ul>
    </nav>
  )
}
