import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { UserForm } from './UserForm';

interface UserEditDialogProps {
	user: ApiUserModel;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const UserEditDialog = ({ user, isOpen, onOpenChange }: UserEditDialogProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
					<DialogDescription>Edit user information</DialogDescription>
				</DialogHeader>

				<div className="pb-4">
					<UserForm
						user={user}
						onSuccess={() => onOpenChange(false)}
						onCancel={() => onOpenChange(false)}
						disableEmail={true}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
