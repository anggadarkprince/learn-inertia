import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import Button from './Button.jsx';

export default function Confirm({
  title,
  message,
  submessage,
  isOpen,
  setIsOpen,
  autoClose = false,
  disabled = false,
  positiveButton,
  negativeButton,
  positiveColor = 'purple',
  negativeColor = 'light',
  onPositiveClicked,
  onNegativeClicked,
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-3">
        <DialogPanel className="max-w-lg space-y-5 shadow-lg bg-white dark:text-gray-200 dark:bg-gray-900 p-5 lg:min-w-96 rounded">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <div>
            <Description className="mb-1">{message}</Description>
            {submessage && <Description className="text-gray-500 text-sm">{submessage}</Description>}
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              color={negativeColor}
              disabled={disabled}
              onClick={() => {
                if (onNegativeClicked) {
                  onNegativeClicked();
                }
                if (autoClose || !onNegativeClicked) {
                  setIsOpen(false);
                }
              }}
            >
              {negativeButton}
            </Button>
            <Button
              color={positiveColor}
              disabled={disabled}
              onClick={() => {
                if (autoClose) {
                  setIsOpen(false);
                }
                if (onPositiveClicked) {
                  onPositiveClicked();
                }
              }}
            >
              {positiveButton}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
