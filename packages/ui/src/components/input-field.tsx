'use client';

import { Label } from '@workspace/ui/components/label';
import { cn } from '@workspace/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputFieldDescriptionVariants = cva(
  'text-muted-foreground leading-snug',
  {
    variants: {
      variant: {
        sm: 'text-xs',
        md: 'text-[0.8125rem]',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  }
);

const inputFieldErrorVariants = cva(
  'text-destructive font-medium leading-snug flex items-start gap-1',
  {
    variants: {
      variant: {
        sm: 'text-xs',
        md: 'text-[0.8125rem]',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  }
);

type InputFieldContextValue = {
  id: string;
  variant?: 'sm' | 'md' | 'lg' | null;
};

const InputFieldContext = React.createContext<InputFieldContextValue | null>(
  null
);

function useInputFieldContext() {
  const context = React.useContext(InputFieldContext);
  if (!context) {
    throw new Error(
      'InputField components must be used within an InputField component'
    );
  }
  return context;
}

interface InputFieldProps extends React.ComponentProps<'div'> {
  variant?: 'sm' | 'md' | 'lg';
}

function InputField({
  className,
  variant = 'md',
  children,
  ...props
}: InputFieldProps) {
  const id = React.useId();

  return (
    <InputFieldContext.Provider value={{ id, variant }}>
      <div className={className} {...props}>
        {children}
      </div>
    </InputFieldContext.Provider>
  );
}

interface InputFieldLabelProps
  extends Omit<React.ComponentProps<typeof Label>, 'htmlFor'> {
  required?: boolean;
}

function InputFieldLabel({
  required,
  children,
  className,
  ...props
}: InputFieldLabelProps) {
  const { id } = useInputFieldContext();

  return (
    <Label htmlFor={id} className={cn('block mb-2', className)} {...props}>
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
  );
}

interface InputFieldControlProps {
  children: React.ReactElement;
  error?: boolean;
}

function InputFieldControl({ children, error }: InputFieldControlProps) {
  const { id } = useInputFieldContext();

  // Clone the child element and pass the necessary props
  return React.cloneElement(children, {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  } as Record<string, unknown>);
}

interface InputFieldDescriptionProps
  extends React.ComponentProps<'p'>,
    VariantProps<typeof inputFieldDescriptionVariants> {}

function InputFieldDescription({
  className,
  variant: variantProp,
  ...props
}: InputFieldDescriptionProps) {
  const { id, variant: contextVariant } = useInputFieldContext();
  const variant = variantProp || contextVariant;

  return (
    <p
      id={`${id}-description`}
      className={cn(
        inputFieldDescriptionVariants({ variant }),
        'mt-1.5',
        className
      )}
      {...props}
    />
  );
}

interface InputFieldErrorProps
  extends React.ComponentProps<'p'>,
    VariantProps<typeof inputFieldErrorVariants> {
  message?: string;
}

function InputFieldError({
  className,
  variant: variantProp,
  message,
  children,
  ...props
}: InputFieldErrorProps) {
  const { id, variant: contextVariant } = useInputFieldContext();
  const variant = variantProp || contextVariant;

  if (!message && !children) return null;

  return (
    <p
      id={`${id}-error`}
      role="alert"
      aria-live="polite"
      className={cn(inputFieldErrorVariants({ variant }), 'mt-1.5', className)}
      {...props}
    >
      {children || message}
    </p>
  );
}

InputFieldError.displayName = 'InputFieldError';

export {
  InputField,
  InputFieldControl,
  InputFieldDescription,
  InputFieldError,
  InputFieldLabel,
};
