import { useGetTest } from '../lib/api/generated/applications-api/applications-api';

export const Test = () => {
	const { data, isLoading } = useGetTest();

	return (
		<h1 className="text-2xl text-green-800">
			{isLoading ? 'Loading...' : data?.data}
			<br />
		</h1>
	);
};
