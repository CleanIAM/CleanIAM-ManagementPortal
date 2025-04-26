import './App.css';
import { Test } from './Components/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false
		}
	}
});

const App = () => (
	<QueryClientProvider client={queryClient}>
		<div className="App">
			<h1 className="text-2xl text-blue-800">Hello world</h1>
			<h1 className="text-2xl text-blue-800">Hello world</h1>
			<h1 className="text-2xl text-blue-800">Hello world</h1>
			<h1 className="text-2xl text-blue-800">Hello world</h1>

			<h1 className="text-2xl text-blue-800">Hello world</h1>
			<Test />
		</div>
	</QueryClientProvider>
);

export default App;
