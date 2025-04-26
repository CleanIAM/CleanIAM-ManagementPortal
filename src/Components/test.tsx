import { useGetTest } from '../api/generated/cleanIAM';

export const Test = () => {
	const { data, isLoading } = useGetTest();

	return (
		<h1 className="text-2xl text-green-800">
			{isLoading ? 'Loading...' : data}
			<br />
		</h1>
	);
};
