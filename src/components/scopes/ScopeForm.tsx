import React, { useState } from 'react';
import { FormButton } from '../form';
import { usePostApiScopes, usePutApiScopesScopeName } from '@/lib/api/generated/scopes-api-endpoint/scopes-api-endpoint';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader } from '@/components/public/Loader';

interface ScopeFormProps {
  scope?: Scope;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ScopeForm: React.FC<ScopeFormProps> = ({ scope, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: scope?.name || '',
    displayName: scope?.displayName || '',
    description: scope?.description || '',
    resources: scope?.resources?.join(', ') || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Create scope mutation
  const createScopeMutation = usePostApiScopes({
    mutation: {
      onSuccess: () => {
        toast.success('Scope created successfully');
        onSuccess();
      },
      onError: (error) => {
        toast.error(`Failed to create scope: ${error.message}`);
      }
    }
  });

  // Update scope mutation
  const updateScopeMutation = usePutApiScopesScopeName({
    mutation: {
      onSuccess: () => {
        toast.success('Scope updated successfully');
        onSuccess();
      },
      onError: (error) => {
        toast.error(`Failed to update scope: ${error.message}`);
      }
    }
  });

  const isLoading = createScopeMutation.isPending || updateScopeMutation.isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Parse resources string to array
    const resources = formData.resources
      .split(',')
      .map(resource => resource.trim())
      .filter(resource => resource !== '');

    if (scope) {
      // Update existing scope
      updateScopeMutation.mutate({
        scopeName: scope.name,
        data: {
          displayName: formData.displayName,
          description: formData.description || null,
          resources
        }
      });
    } else {
      // Create new scope
      createScopeMutation.mutate({
        data: {
          name: formData.name,
          displayName: formData.displayName,
          description: formData.description || null,
          resources
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading || !!scope} // Disable name field when editing
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>
      
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.displayName ? 'border-red-500' : ''}
        />
        {errors.displayName && <p className="mt-1 text-xs text-red-500">{errors.displayName}</p>}
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="resources">Resources (comma-separated)</Label>
        <Textarea
          id="resources"
          name="resources"
          value={formData.resources}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="api:read, api:write, etc."
          rows={2}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <FormButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </FormButton>
        <FormButton
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4" />
              {scope ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            scope ? 'Update Scope' : 'Create Scope'
          )}
        </FormButton>
      </div>
    </form>
  );
};
