import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import Container from '@mui/material/Container'

const Root = () => {

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ height: '88vh', overflowY: 'scroll', pt: '20px' }} >
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Root