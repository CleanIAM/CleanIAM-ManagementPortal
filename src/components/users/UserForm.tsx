import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useGetApiUsers,
  usePostApiUsersInvited,
  usePutApiUsersId
} from '@/lib/api/generated/users-api/users-api';
import { ApiUserModel, UserRole } from '@/lib/api/generated/cleanIAM.schemas';
import { FormButton } from '@/components/form';
import { toast } from 'react-toastify';
import { Loader } from '../public/Loader';

// Define the validation schema with Zod
const userFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email address' }),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(64, { message: 'First name must be less than 64 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(64, { message: 'Last name must be less than 64 characters' }),
  roles: z.array(z.nativeEnum(UserRole)).min(1, { message: 'At least one role must be selected' })
});

// TypeScript type for the form values
type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  user?: ApiUserModel;
  onSuccess: () => void;
  onCancel: () => void;
  disableEmail?: boolean;
  tenant?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSuccess,
  onCancel,
  disableEmail = false,
  tenant
}) => {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      roles: user?.roles || []
    }
  });

  const { refetch } = useGetApiUsers(tenant ? { tenant } : undefined);

  // Create user mutation
  const createUserMutation = usePostApiUsersInvited({
    mutation: {
      onSuccess: () => {
        toast.success('User created successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(error.message);
      }
    }
  });

  // Update user mutation
  const updateUserMutation = usePutApiUsersId({
    mutation: {
      onSuccess: () => {
        toast.success('User updated successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(`Failed to update user: ${error.message}`);
      }
    }
  });

  // Form submission handler with event prevention
  const onSubmit = (data: UserFormValues, event?: React.BaseSyntheticEvent) => {
    // Prevent default form submission behavior
    event?.preventDefault();
    event?.stopPropagation();
    if (user) {
      // Update existing user
      updateUserMutation.mutate({
        id: user.id,
        data,
        params: tenant ? { tenant } : undefined
      });
    } else {
      // Create new user
      createUserMutation.mutate({
        data: data,
        params: tenant ? { tenant } : undefined
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* User Email */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } ${disableEmail ? 'bg-gray-100' : ''}`}
          disabled={disableEmail}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* First name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          {...register('firstName')}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.firstName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          {...register('lastName')}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.lastName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Roles</label>
        <Controller
          control={control}
          name="roles"
          render={({ field }) => (
            <div className="flex flex-wrap gap-4">
              {Object.entries(UserRole).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.value.includes(value)}
                    onChange={e => {
                      const updatedRoles = e.target.checked
                        ? [...field.value, value]
                        : field.value.filter(role => role !== value);
                      field.onChange(updatedRoles);
                    }}
                    className="mr-2"
                  />
                  <span>{key}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.roles && <p className="mt-1 text-sm text-red-600">{errors.roles.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <FormButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </FormButton>
        <FormButton
          type="submit"
          disabled={isSubmitting || createUserMutation.isPending || updateUserMutation.isPending}
        >
          {isSubmitting || createUserMutation.isPending || updateUserMutation.isPending ? (
            user ? (
              <div className="flex">
                <Loader className="mr-1 h-4 w-4" />
                Updating...
              </div>
            ) : (
              <div className="flex">
                <Loader className="mr-1 h-4 w-4" />
                Creating...
              </div>
            )
          ) : user ? (
            'Update User'
          ) : (
            'Invite User'
          )}
        </FormButton>
      </div>
    </form>
  );
};
