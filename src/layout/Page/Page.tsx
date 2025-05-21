import { Sidebar } from '../../components/sidebar/Sidebar'

import './styles.scss'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className='page-layout'>
      <Sidebar />
      {children}
    </div>
  )
}
