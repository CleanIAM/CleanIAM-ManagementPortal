import React from 'react';
import { FormButton } from '@/components/form';

interface UserActionsProps {
  userId: string;
  onDelete: () => void;
  onToggleStatus: () => void;
  isDisabled?: boolean;
}

export const UserActions: React.FC<UserActionsProps> = ({ 
  userId, 
  onDelete,
  onToggleStatus,
  isDisabled = false
}) => {
  return (
    <div className="flex gap-2 justify-end">
      <FormButton
        onClick={onToggleStatus}
        variant="secondary"
        className="text-sm px-2 py-1"
      >
        {isDisabled ? 'Enable' : 'Disable'}
      </FormButton>
      <FormButton
        onClick={onDelete}
        variant="danger"
        className="text-sm px-2 py-1"
      >
        Delete
      </FormButton>
    </div>
  );
};
