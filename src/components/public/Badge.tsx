import { cn } from '@/lib/utils';

type BadgeProps = {
  value: string;
} & React.HTMLProps<HTMLSpanElement>;

export const Badge = ({ value, className, ...props }: BadgeProps) => {
  return (
    <span className={cn('rounded-full px-2 py-1 text-xs', className)} {...props}>
      {value}
    </span>
  );
};
