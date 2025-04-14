import MainHeader from "../components/MainHeader"
import { Outlet } from "react-router-dom"

function RootLayout(){
    return <>
        <MainHeader></MainHeader>
        <Outlet></Outlet>
    </>
}

export default RootLayout