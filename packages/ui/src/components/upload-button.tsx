import type { ButtonProps } from '@workspace/ui/components/button';
import { Button } from '@workspace/ui/components/button';
import type { UploadHookControl } from 'better-upload/client';
import { Loader2, Upload } from 'lucide-react';
import { useId } from 'react';

type UploadButtonProps = {
  control: UploadHookControl<false>;
  accept?: string;
  metadata?: Record<string, unknown>;
  uploadOverride?: (
    ...args: Parameters<UploadHookControl<false>['upload']>
  ) => void;

  // Add any additional props you need.
  buttonText?: string;
} & ButtonProps;

export function UploadButton({
  control: { upload, isPending },
  accept,
  metadata,
  uploadOverride,
  buttonText = 'Upload file',
  ...buttonProps
}: UploadButtonProps) {
  const id = useId();

  return (
    <Button
      disabled={isPending}
      className="relative"
      type="button"
      {...buttonProps}
    >
      <label htmlFor={id} className="absolute inset-0 cursor-pointer">
        <input
          id={id}
          className="absolute inset-0 size-0 opacity-0"
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.[0] && !isPending) {
              if (uploadOverride) {
                console.log('Overriding upload...');
                uploadOverride(e.target.files[0], { metadata });
              } else {
                upload(e.target.files[0], { metadata });
              }
            }
            e.target.value = '';
          }}
        />
      </label>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {buttonText}
        </>
      ) : (
        <>
          <Upload className="size-4" />
          {buttonText}
        </>
      )}
    </Button>
  );
}
