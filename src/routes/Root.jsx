import Header from "../components/Header"
import Footer from "../components/Footer"
import { Types } from "../routes/Types"
import { Outlet } from "react-router-dom"

const Root = () => {

  return (
    <>
      <Header />
      {/* <Types /> */}
      <Outlet />
      <Footer />
    </>
  )
}

export default Root