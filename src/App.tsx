import { useMemo, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "urql"
import { IconContext } from "phosphor-react"
import { indigo } from "tailwindcss/colors"
import { AuthRoute } from "./components/AuthRoute"
import { ProtectedRoute } from "./components/ProtectedRoute"
import MainProvider from "./main.provider"
import LoginScreen from "./pages/auth/login/login.screen"
import WelcomeScreen from "./pages/auth/welcome/welcome.screen"
import { Layout } from "./pages/main/Layout"
import DashboardScreen from "./pages/main/Dashboard/dashboard.screen"
import { AuthState, ClientService } from "./utils/client.service"

function App() {
    const client = useMemo(
        () => new ClientService(`${import.meta.env.VITE_API_URL}/graphql`),
        []
    )
    const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null)

    useMemo(
        () =>
            client.state.subscribe((state) =>
                setLoggedIn(state === AuthState.AUTHENTICATED)
            ),
        [client]
    )

    return (
        <MainProvider clientService={client}>
            <IconContext.Provider
                value={{
                    color: indigo[500]
                }}
            >
                <Provider value={client.urqlClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/auth"
                                element={<AuthRoute isLoggedIn={isLoggedIn} />}
                            >
                                <Route
                                    path="welcome"
                                    element={<WelcomeScreen />}
                                />
                                <Route path="login" element={<LoginScreen />} />
                            </Route>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <Layout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<DashboardScreen />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </IconContext.Provider>
        </MainProvider>
    )
}

export default App
