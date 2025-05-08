import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Loader } from '@/components/public/Loader';
import { cn } from '@/lib/utils';

interface MfaSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  id?: string;
}

export const MfaSwitch: React.FC<MfaSwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  loading = false,
  tooltip,
  id
}) => {
  // Create custom switch with loading state
  const switchElement = (
    <div className="relative inline-flex items-center">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled || loading}
        id={id}
        className={cn(
          'data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-500',
          loading && 'opacity-80'
        )}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/80 dark:bg-black/50 rounded-full h-4 w-4 flex items-center justify-center">
            <Loader className="h-3 w-3" />
          </div>
        </div>
      )}
    </div>
  );

  // Add tooltip if provided and component is disabled
  if (tooltip && (disabled || loading)) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{switchElement}</span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return switchElement;
};
