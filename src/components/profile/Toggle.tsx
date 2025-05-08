import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Loader } from '@/components/public/Loader';

interface ToggleProps {
	isChecked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
	id?: string;
	tooltip?: string;
	isLoading?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
	isChecked,
	onChange,
	disabled = false,
	id = 'toggle',
	tooltip,
	isLoading = false
}) => {
	const toggleElement = (
		<div className="relative inline-block h-6 w-12">
			<input
				type="checkbox"
				id={id}
				className="sr-only"
				checked={isChecked}
				onChange={e => onChange(e.target.checked)}
				disabled={disabled || isLoading}
			/>
			<label
				htmlFor={id}
				className={`block h-6 w-12 cursor-pointer rounded-full transition-colors ${
					isChecked ? 'bg-green-500' : 'bg-gray-300'
				} ${disabled || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
			></label>
			<span
				className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform ${
					isChecked ? 'translate-x-6' : ''
				} ${isLoading ? 'flex items-center justify-center' : ''}`}
			>
				{isLoading && <Loader className="h-3 w-3 text-gray-500" />}
			</span>
		</div>
	);

	if ((tooltip && disabled) || (tooltip && isLoading)) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{toggleElement}</TooltipTrigger>
				<TooltipContent side="bottom">{tooltip}</TooltipContent>
			</Tooltip>
		);
	}

	return toggleElement;
};
