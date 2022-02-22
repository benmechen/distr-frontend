import React, { useContext } from "react"
import { ClientService } from "./utils/client.service"

interface IMainContext {
    clientService?: ClientService
}

const MainContext = React.createContext<IMainContext>({
    clientService: undefined
})

interface IMainProvider {
    clientService: ClientService
    children: React.ReactNode
}

const MainProvider = ({ clientService, children }: IMainProvider) => {
    return (
        <MainContext.Provider
            value={{
                clientService
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext)

export default MainProvider
