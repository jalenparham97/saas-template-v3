'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  UseFormProps,
  useForm,
  useFormContext,
  type DeepPartialSkipArrayKey,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import type * as z from 'zod/v4';

// Re-export commonly used react-hook-form components
export { Controller } from 'react-hook-form';

type ZodSchema = z.ZodType<FieldValues>;

export const createZodForm = <TSchema extends ZodSchema>(schema: TSchema) => {
  const useFormHook = (props?: Omit<UseZodFormProps<TSchema>, 'schema'>) => {
    return useZodForm({ schema, ...props });
  };

  const useFormContextHook = () => {
    return useFormContext() as ReturnType<typeof useFormHook>;
  };

  return [useFormHook, useFormContextHook] as const;
};

type UseZodFormReturn<TSchema extends ZodSchema> = UseFormReturn<
  DeepPartialSkipArrayKey<z.infer<TSchema>>,
  unknown,
  z.infer<TSchema>
>;

type UseZodFormProps<TSchema extends ZodSchema> = Omit<
  UseFormProps<z.infer<TSchema>>,
  'resolver'
> & {
  schema: TSchema;
};

export const useZodForm = <TSchema extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<TSchema>): UseZodFormReturn<TSchema> => {
  return useForm({
    // Type assertion needed due to @hookform/resolvers not fully supporting Zod v4 yet
    resolver: zodResolver(schema as never),
    ...formProps,
  }) as unknown as UseZodFormReturn<TSchema>;
};
