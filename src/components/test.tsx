import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { useGetApiUsersTest } from '@/lib/api/generated/users-api/users-api';

export const Test = () => {
	const { data, isLoading } = useGetApiUsersTest();

	return (
		<h1 className="text-2xl text-green-800">
			{isLoading ? 'Loading...' : data?.data}
			<br />

			<Button onClick={() => toast('Hello toast')}> Toast</Button>
		</h1>
	);
};
