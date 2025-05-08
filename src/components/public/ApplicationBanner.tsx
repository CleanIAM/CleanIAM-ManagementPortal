import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Delete02Icon, LaptopProgrammingIcon, PencilEdit01Icon } from 'hugeicons-react';
import { DialogHeader } from '../ui/dialog';
import { ApplicationForm } from './ApplicationForm';
import { useState } from 'react';
import { useGetApiApplications } from '@/lib/api/generated/applications-api/applications-api';
import { DeleteApplicationConfirmDialog } from './DeleteApplicationConfirmDialog';
type ApplicationBannerProps = {
  app: ApiApplicationModel;
  onDelete: (id: string) => void;
} & React.HTMLProps<HTMLDivElement>;

export const ApplicationBanner = ({
  app,
  onDelete,
  className,
  ...props
}: ApplicationBannerProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { refetch } = useGetApiApplications();

  return (
    <div
      {...props}
      className={cn(
        className,
        'flex cursor-pointer items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:bg-blue-100 hover:shadow-lg'
      )}
      onClick={() => setIsEditModalOpen(true)}
    >
      <LaptopProgrammingIcon size={30} className="m-2" />
      <div className="w-full">
        <div className="flex w-full justify-between">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            {app.displayName || app.clientId}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent banner click
                setIsEditModalOpen(true);
              }}
              className="text-blue-600 hover:text-blue-800"
              title="Edit Application"
            >
              <PencilEdit01Icon size={20} />
            </button>
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent banner click
                setIsDeleteModalOpen(true);
              }}
              className="text-red-600 hover:text-red-800"
              title="Delete Application"
            >
              <Delete02Icon size={20} />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Client ID: {app.clientId}</p>
        <p className="text-sm text-gray-600">
          Type: {app.applicationType} / {app.clientType}
        </p>
      </div>

      {/* Edit Application Form Dialog */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={open => {
          setIsEditModalOpen(open);
        }}
        modal={true}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{app.displayName || app.clientId}</DialogTitle>
            <DialogDescription>
              Edit the details of your existing OpenID Connect application
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-auto py-4 pr-2">
            <ApplicationForm
              isEdit={true}
              initialData={app}
              onSuccess={() => {
                setIsEditModalOpen(false);
                refetch();
              }}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Application Confirmation Dialog */}
      <DeleteApplicationConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleting(true);
          onDelete(app.id);
          setIsDeleting(false);
          setIsDeleteModalOpen(false);
        }}
        isDeleting={isDeleting}
        applicationName={app.displayName || app.clientId}
      />
    </div>
  );
};
