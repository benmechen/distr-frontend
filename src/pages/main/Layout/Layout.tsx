import { Outlet } from "react-router-dom"
import { Emphasis } from "../../../components/Emphasis"

const Layout = () => (
    <main>
        <nav className="w-screen p-4 bg-gray-900 text-white font-medium text-3xl text-center fixed">
            Your <Emphasis>Systems</Emphasis>
        </nav>
        <Outlet />
    </main>
)
export default Layout
