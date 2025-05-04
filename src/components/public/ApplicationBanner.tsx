import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import { cn } from '@/lib/utils';
import { LaptopProgrammingIcon } from 'hugeicons-react';
type ApplicationBannerProps = {
	app: ApiApplicationModel;
	onDelete: (id: string) => void;
	onView: (id: string) => void;
} & React.HTMLProps<HTMLDivElement>;

export const ApplicationBanner = ({
	app,
	onDelete,
	onView,
	className,
	...props
}: ApplicationBannerProps) => {
	return (
		<div
			{...props}
			className={cn(
				className,
				'flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:bg-blue-100 hover:shadow-lg'
			)}
			onClick={() => onView(app.id)}
		>
			<LaptopProgrammingIcon size={30} className="m-2" />
			<div className="w-full">
				<div className="flex w-full justify-between">
					<h3 className="mb-2 text-lg font-semibold text-blue-800">
						{app.displayName || app.clientId}
					</h3>
					<button
						onClick={() => onDelete(app.id)}
						className="text-red-600 hover:text-red-800"
						title="Delete Application"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
							<path
								fillRule="evenodd"
								d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
							/>
						</svg>
					</button>
				</div>
				<p className="text-sm text-gray-600">Client ID: {app.clientId}</p>
				<p className="text-sm text-gray-600">
					Type: {app.applicationType} / {app.clientType}
				</p>
			</div>
		</div>
	);
};
