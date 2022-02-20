import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "urql"
import WelcomeScreen from "./pages/auth/welcome/welcome.screen"
import { ClientService } from "./utils/client.service"

function App() {
    const client = new ClientService(`${import.meta.env.VITE_API_URL}/graphql`)
    return (
        <Provider value={client.urqlClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/welcome" element={<WelcomeScreen />}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
