import { useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'urql';
import { IconContext } from 'phosphor-react';
import { indigo } from 'tailwindcss/colors';
import { AuthRoute } from './components/AuthRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthState, ClientService } from './utils/client.service';
import MainProvider from './main.provider';
import LoginScreen from './pages/auth/login/login.screen';
import WelcomeScreen from './pages/auth/welcome/welcome.screen';
import DashboardScreen from './pages/main/Dashboard/dashboard.screen';
import SystemScreen from './pages/main/System/system.screen';
import CreateResourceScreen from './pages/main/System/CreateResource/create-resource.screen';
import MarketplaceScreen from './pages/main/Marketplace/marketplace.screen';
import ResourceScreen from './pages/main/System/Resource/resource.screen';

function App() {
	const client = useMemo(
		() => new ClientService(`${import.meta.env.VITE_API_URL}/graphql`),
		[],
	);
	const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

	useMemo(
		() =>
			client.state.subscribe((state) =>
				setLoggedIn(state === AuthState.AUTHENTICATED),
			),
		[client],
	);

	return (
		<MainProvider clientService={client}>
			<IconContext.Provider
				value={{
					color: indigo[500],
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
									<ProtectedRoute isLoggedIn={isLoggedIn} />
								}
							>
								<Route
									path="system/:id"
									element={<SystemScreen />}
								/>
								<Route
									path="system/:id/resource/new"
									element={<CreateResourceScreen />}
								/>
								<Route
									path="system/:systemId/resource/:id"
									element={<ResourceScreen />}
								/>
								<Route
									path="marketplace"
									element={<MarketplaceScreen />}
								/>
								<Route index element={<DashboardScreen />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</Provider>
			</IconContext.Provider>
		</MainProvider>
	);
}

export default App;
