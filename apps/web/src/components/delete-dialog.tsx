'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';

interface DeleteDialogProps {
  /**
   * Trigger element for the dialog
   */
  trigger: React.ReactNode;

  /**
   * Dialog title
   */
  title?: string;

  /**
   * Dialog description/confirmation message
   */
  description?: string;

  /**
   * Text for the delete button
   */
  deleteButtonText?: string;

  /**
   * Text for the cancel button
   */
  cancelButtonText?: string;

  /**
   * Callback fired when delete is confirmed
   */
  onDelete: () => void | Promise<void>;

  /**
   * Loading state - disables buttons and shows spinner
   */
  loading?: boolean;

  /**
   * Whether the dialog is open (controlled)
   */
  open?: boolean;

  /**
   * Callback for when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether to show the delete button as destructive (red)
   */
  destructive?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Custom content to render instead of title/description
   */
  children?: React.ReactNode;

  /**
   * Optional confirmation text that user must type to enable delete button
   */
  confirmationText?: string;

  /**
   * Label for the confirmation input field
   */
  confirmationInputLabel?: string;

  /**
   * Placeholder text for the confirmation input field
   */
  confirmationInputPlaceholder?: string;
}

/**
 * DeleteDialog Component
 *
 * A flexible confirmation dialog for delete actions with loading state support.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [open, setOpen] = useState(false);
 * const [loading, setLoading] = useState(false);
 *
 * const handleDelete = async () => {
 *   setLoading(true);
 *   try {
 *     await deleteItem();
 *     setOpen(false);
 *   } finally {
 *     setLoading(false);
 *   }
 * };
 *
 * return (
 *   <DeleteDialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     loading={loading}
 *     onDelete={handleDelete}
 *     trigger={<Button>Delete Item</Button>}
 *     title="Delete Item"
 *     description="Are you sure you want to delete this item? This action cannot be undone."
 *     deleteButtonText="Delete"
 *     cancelButtonText="Cancel"
 *   />
 * );
 * ```
 *
 * @example
 * ```tsx
 * // With confirmation input
 * return (
 *   <DeleteDialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     loading={loading}
 *     onDelete={handleDelete}
 *     trigger={<Button>Delete Account</Button>}
 *     title="Delete your account?"
 *     description="This action cannot be undone."
 *     confirmationText="DELETE"
 *     confirmationInputLabel="Type DELETE to confirm"
 *     confirmationInputPlaceholder="Type DELETE to confirm"
 *   />
 * );
 * ```
 */
export function DeleteDialog({
  trigger,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  deleteButtonText = 'Delete',
  cancelButtonText = 'Cancel',
  onDelete,
  loading = false,
  open,
  onOpenChange,
  destructive = true,
  className,
  children,
  confirmationText,
  confirmationInputLabel,
  confirmationInputPlaceholder,
}: DeleteDialogProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');

  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled
    ? onOpenChange || (() => {})
    : setInternalOpen;

  const isConfirmationMatched =
    !confirmationText || confirmationInput === confirmationText;

  const handleDelete = useCallback(async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }, [onDelete]);

  const handleOpenChange = (newOpen: boolean) => {
    setDialogOpen(newOpen);
    // Reset confirmation input when dialog closes
    if (!newOpen) {
      setConfirmationInput('');
    }
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        {children ? (
          children
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
          </>
        )}
        {confirmationText && (
          <InputField>
            {confirmationInputLabel && (
              <InputFieldLabel>{confirmationInputLabel}</InputFieldLabel>
            )}
            <InputFieldControl>
              <Input
                placeholder={confirmationInputPlaceholder}
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                disabled={loading}
                className="font-mono"
              />
            </InputFieldControl>
          </InputField>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelButtonText}
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={loading || !isConfirmationMatched}
            variant={destructive ? 'destructive' : 'primary'}
            className="gap-2"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {deleteButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
