import { Footer } from 'widgets/Footer';
import { Header } from 'widgets/Header'
import { Outlet } from 'react-router-dom'
const Root = () => {
  return (
    <>
          <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Root