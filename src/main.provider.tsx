import React, { useContext, useMemo } from 'react';
import { ClientService } from './utils/client.service';

interface IMainContext {
    clientService?: ClientService;
}

const MainContext = React.createContext<IMainContext>({
    clientService: undefined,
});

interface IMainProvider {
    clientService: ClientService;
    children: React.ReactNode;
}

const MainProvider = ({ clientService, children }: IMainProvider) => {
    const cs = useMemo(() => ({ clientService }), []);
    return <MainContext.Provider value={cs}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
