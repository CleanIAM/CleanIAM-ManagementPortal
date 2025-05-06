import { cn } from '@/lib/utils';
import { CheckmarkSquare01Icon, Copy02Icon } from 'hugeicons-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type TextWithCopyProps = {
	value: string;
} & React.HTMLProps<HTMLDivElement>;

export const TextWithCopy = ({ value: text, className, ...props }: TextWithCopyProps) => {
	const [copied, setCopied] = useState(false);

	// Handle copying client secret to clipboard
	const handleCopySecret = () => {
		if (text) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					setCopied(true);

					// Reset the copied state after 3 seconds
					setTimeout(() => {
						setCopied(false);
					}, 1000);
				})
				.catch(() => {
					toast.error('Failed to copy secret to clipboard');
				});
		}
	};

	return (
		<div className={cn('flex content-between justify-between', className)} {...props}>
			<span className=" text-gray-700">{text}</span>
			<button
				className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700"
				onClick={handleCopySecret}
			>
				{copied ? (
					<CheckmarkSquare01Icon className="h-5 w-5 text-green-700" />
				) : (
					<Copy02Icon className="h-5 w-5" />
				)}
			</button>
		</div>
	);
};
