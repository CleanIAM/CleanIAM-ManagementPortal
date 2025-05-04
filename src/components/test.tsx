import { toast } from 'react-toastify';
import { useGetTest } from '../lib/api/generated/applications-api/applications-api';
import { Button } from './ui/button';

export const Test = () => {
	const { data, isLoading } = useGetTest();

	return (
		<h1 className="text-2xl text-green-800">
			{isLoading ? 'Loading...' : data?.data}
			<br />

			<Button onClick={() => toast('Hello toast')}> Toast</Button>
		</h1>
	);
};
