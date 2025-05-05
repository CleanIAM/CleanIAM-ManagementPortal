import { cn } from '@/lib/utils';
import { Loading02Icon } from 'hugeicons-react';

export const Loader = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
	return (
		<div className={cn('h-4 w-4', className)} {...props}>
			<Loading02Icon size={16} className="h-full w-full animate-spin" />
		</div>
	);
};
