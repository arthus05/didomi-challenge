import { Link, useLocation } from 'wouter'

import './styles.scss'

export const Sidebar = () => {
  const [currentPath] = useLocation()

  return (
    <nav className='sidebar'>
      <ul className='sidebar__list'>
        <li className={`sidebar__list-item ${currentPath === '/give-consent' ? 'sidebar__list-item--active' : ''}`}>
          <Link to='/give-consent'>Give consent</Link>
        </li>
        <li className={`sidebar__list-item ${currentPath === '/consents' ? 'sidebar__list-item--active' : ''}`}>
          <Link to='/consents'>Collected consents</Link>
        </li>
      </ul>
    </nav>
  )
}
