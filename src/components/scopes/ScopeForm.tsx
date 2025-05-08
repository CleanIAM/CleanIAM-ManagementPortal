import React, { useEffect } from 'react';
import { FormButton } from '../form';
import {
  useGetApiScopes,
  usePostApiScopes,
  usePutApiScopesScopeName
} from '@/lib/api/generated/scopes-api-endpoint/scopes-api-endpoint';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader } from '@/components/public/Loader';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MultiSelectField } from '@/components/form/MultiSelectField';
import { mockApplications } from '@/lib/mock/applications';

// Define Zod schema for form validation
const ScopeFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  description: z.string().optional(),
  resources: z.array(z.string()).min(1, 'At least one resource is required')
});

// Define the type based on the schema
type ScopeFormValues = z.infer<typeof ScopeFormSchema>;

interface ScopeFormProps {
  scope?: Scope;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ScopeForm: React.FC<ScopeFormProps> = ({ scope, onSuccess, onCancel }) => {
  // Convert application objects to options for the MultiSelectField with ID included in label
  const applicationOptions = mockApplications.map(app => ({
    value: app.id,
    label: `${app.name}`,
    tooltip: `[${app.id}] ${app.description ? ` ${app.description}` : ''}`
  }));

  // Initialize form with react-hook-form and zod validation
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ScopeFormValues>({
    resolver: zodResolver(ScopeFormSchema),
    defaultValues: {
      name: scope?.name || '',
      displayName: scope?.displayName || '',
      description: scope?.description || '',
      resources: scope?.resources || []
    }
  });

  const { refetch } = useGetApiScopes();

  // Set initial form data when scope changes
  useEffect(() => {
    if (scope) {
      reset({
        name: scope.name,
        displayName: scope.displayName,
        description: scope.description || '',
        resources: scope.resources
      });
    }
  }, [scope, reset]);

  // Create scope mutation
  const createScopeMutation = usePostApiScopes({
    mutation: {
      onSuccess: () => {
        toast.success('Scope created successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(`Failed to create scope: ${error.message}`);
      }
    }
  });

  // Update scope mutation
  const updateScopeMutation = usePutApiScopesScopeName({
    mutation: {
      onSuccess: () => {
        toast.success('Scope updated successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(`Failed to update scope: ${error.message}`);
      }
    }
  });

  const isLoading = createScopeMutation.isPending || updateScopeMutation.isPending;

  const onSubmit = (data: ScopeFormValues) => {
    if (scope) {
      // Update existing scope
      updateScopeMutation.mutate({
        scopeName: scope.name,
        data: {
          displayName: data.displayName,
          description: data.description || null,
          resources: data.resources
        }
      });
    } else {
      // Create new scope
      createScopeMutation.mutate({
        data: {
          name: data.name,
          displayName: data.displayName,
          description: data.description || null,
          resources: data.resources
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              id="name"
              {...field}
              disabled={isLoading || !!scope} // Disable name field when editing
              className={errors.name ? 'border-red-500' : ''}
            />
          )}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <Input
              id="displayName"
              {...field}
              disabled={isLoading}
              className={errors.displayName ? 'border-red-500' : ''}
            />
          )}
        />
        {errors.displayName && (
          <p className="mt-1 text-xs text-red-500">{errors.displayName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea id="description" {...field} disabled={isLoading} rows={3} />
          )}
        />
      </div>

      <div>
        <MultiSelectField
          name="resources"
          label="Applications"
          options={applicationOptions}
          setValue={setValue}
          watch={watch}
          error={errors.resources}
          isLoading={false}
          className="mb-4"
        />
        <div className="text-xs text-gray-500">Select applications that this scope applies to</div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <FormButton type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </FormButton>
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4" />
              {scope ? 'Updating...' : 'Creating...'}
            </>
          ) : scope ? (
            'Update Scope'
          ) : (
            'Create Scope'
          )}
        </FormButton>
      </div>
    </form>
  );
};
