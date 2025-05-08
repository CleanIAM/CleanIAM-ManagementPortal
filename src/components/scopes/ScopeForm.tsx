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
import { ScopeFormSchema, ScopeFormValues } from '@/lib/validations/scope';

interface ScopeFormProps {
  scope?: Scope;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ScopeForm: React.FC<ScopeFormProps> = ({ scope, onSuccess, onCancel }) => {
  // Initialize form with react-hook-form and zod validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ScopeFormValues>({
    resolver: zodResolver(ScopeFormSchema),
    defaultValues: {
      name: scope?.name || '',
      displayName: scope?.displayName || '',
      description: scope?.description || '',
      resources: scope?.resources?.join(', ') || ''
    }
  });

  // Set initial form data when scope changes
  useEffect(() => {
    if (scope) {
      reset({
        name: scope.name,
        displayName: scope.displayName,
        description: scope.description || '',
        resources: scope.resources.join(', ')
      });
    }
  }, [scope, reset]);

  const { refetch } = useGetApiScopes();

  // Create scope mutation
  const createScopeMutation = usePostApiScopes({
    mutation: {
      onSuccess: () => {
        toast.success('Scope created successfully');
        refetch();
        onSuccess();
      },
      onError: error => {
        toast.error(
          <p>
            Failed to create scope: <br />
            {error.message}
          </p>
        );
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
        toast.error(
          <p>
            Failed to update scope: <br />
            {error.message}
          </p>
        );
      }
    }
  });

  const isLoading = createScopeMutation.isPending || updateScopeMutation.isPending;

  const onSubmit = (data: ScopeFormValues) => {
    // Parse resources string to array
    const resources = data.resources
      ? data.resources
          .split(',')
          .map(resource => resource.trim())
          .filter(resource => resource !== '')
      : [];

    if (scope) {
      // Update existing scope
      updateScopeMutation.mutate({
        scopeName: scope.name,
        data: {
          displayName: data.displayName,
          description: data.description || null,
          resources
        }
      });
    } else {
      // Create new scope
      createScopeMutation.mutate({
        data: {
          name: data.name,
          displayName: data.displayName,
          description: data.description || null,
          resources
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
        <Label htmlFor="resources">Resources (comma-separated)</Label>
        <Controller
          name="resources"
          control={control}
          render={({ field }) => (
            <Textarea
              id="resources"
              {...field}
              disabled={isLoading}
              placeholder="api:read, api:write, etc."
              rows={2}
            />
          )}
        />
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
