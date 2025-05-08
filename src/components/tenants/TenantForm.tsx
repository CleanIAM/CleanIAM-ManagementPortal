import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useGetApiTenants,
  usePostApiTenants,
  usePutApiTenantsTenantId
} from '@/lib/api/generated/tenants/tenants';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { FormButton } from '@/components/form';
import { toast } from 'react-toastify';
import { Loader } from '../public/Loader';

// Define the validation schema with Zod
const tenantFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Tenant name must be at least 2 characters' })
    .max(50, { message: 'Tenant name must be less than 50 characters' })
});

// TypeScript type for the form values
type TenantFormValues = z.infer<typeof tenantFormSchema>;

interface TenantFormProps {
  tenant?: ApiTenantModel;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({ tenant, onSuccess, onCancel }) => {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TenantFormValues>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      name: tenant?.name || ''
    }
  });

  const { refetch } = useGetApiTenants();

  // Create tenant mutation
  const createTenantMutation = usePostApiTenants({
    mutation: {
      onSuccess: () => {
        toast.success('Tenant created successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(error.message);
      }
    }
  });

  // Update tenant mutation
  const updateTenantMutation = usePutApiTenantsTenantId({
    mutation: {
      onSuccess: () => {
        toast.success('Tenant updated successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(`Failed to update tenant: ${error.message}`);
      }
    }
  });

  // Form submission handler with event prevention
  const onSubmit = (data: TenantFormValues, event?: React.BaseSyntheticEvent) => {
    // Prevent default form submission behavior
    event?.preventDefault();
    event?.stopPropagation();

    if (tenant) {
      // Update existing tenant
      updateTenantMutation.mutate({
        tenantId: tenant.id,
        data
      });
    } else {
      // Create new tenant
      createTenantMutation.mutate({
        data
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Tenant Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Tenant Name</label>
        <input
          type="text"
          {...register('name')}
          className={`w-full rounded-md border px-3 py-2 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <FormButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </FormButton>
        <FormButton
          type="submit"
          disabled={
            isSubmitting || createTenantMutation.isPending || updateTenantMutation.isPending
          }
        >
          {isSubmitting || createTenantMutation.isPending || updateTenantMutation.isPending ? (
            tenant ? (
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
          ) : tenant ? (
            'Update Tenant'
          ) : (
            'Create Tenant'
          )}
        </FormButton>
      </div>
    </form>
  );
};
