'use client';

import { useZodForm } from '@workspace/react-form';
import { Button } from '@workspace/ui/components/button';
import {
  Input,
  InputAddon,
  InputGroup,
  InputWrapper,
} from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldDescription,
  InputFieldError,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { DollarSignIcon, MailIcon, SearchIcon } from 'lucide-react';
import { z } from 'zod/v4';

// Define a schema
const formSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address.' }),
});

export default function Page() {
  // Use the form hook with the schema
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Form submitted:', data);
    alert(`Form submitted! Email: ${data.email}`);
  });

  return (
    <div className="flex items-center justify-center min-h-svh p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">InputField Component Examples</h1>
          <p className="text-muted-foreground">
            Composable form fields with labels, descriptions, and error states
          </p>
        </div>

        <div className="grid gap-8">
          {/* Basic Input */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Basic Input</h2>
            <InputField>
              <InputFieldLabel>Email</InputFieldLabel>
              <InputFieldControl>
                <Input type="email" placeholder="Enter your email" />
              </InputFieldControl>
            </InputField>
          </div>

          {/* Input with Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">With Description</h2>
            <InputField>
              <InputFieldLabel>Username</InputFieldLabel>
              <InputFieldControl>
                <Input placeholder="johndoe" />
              </InputFieldControl>
              <InputFieldDescription>
                Choose a unique username. This will be visible to other users.
              </InputFieldDescription>
            </InputField>
          </div>

          {/* Required with Error */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Required Field with Error</h2>
            <InputField>
              <InputFieldLabel required>Email</InputFieldLabel>
              <InputFieldControl error>
                <Input type="email" placeholder="you@example.com" />
              </InputFieldControl>
              <InputFieldError message="Please enter a valid email address" />
            </InputField>
          </div>

          {/* With Icon Inside */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">With Icon Inside</h2>
            <InputField>
              <InputFieldLabel>Search</InputFieldLabel>
              <InputFieldControl>
                <InputWrapper>
                  <SearchIcon className="size-4" />
                  <Input placeholder="Search..." />
                </InputWrapper>
              </InputFieldControl>
            </InputField>
          </div>

          {/* With Prefix and Suffix */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">With Prefix &amp; Suffix</h2>
            <InputField>
              <InputFieldLabel>Price</InputFieldLabel>
              <InputFieldControl>
                <InputGroup>
                  <InputAddon mode="icon">
                    <DollarSignIcon className="size-4" />
                  </InputAddon>
                  <Input type="number" placeholder="0.00" />
                  <InputAddon>USD</InputAddon>
                </InputGroup>
              </InputFieldControl>
              <InputFieldDescription>
                Enter the price in US dollars
              </InputFieldDescription>
            </InputField>
          </div>

          {/* Complete Form */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              Complete Form with Validation
            </h2>
            <form
              onSubmit={onSubmit}
              className="space-y-4 p-6 border rounded-lg"
            >
              <InputField>
                <InputFieldLabel required>Email</InputFieldLabel>
                <InputFieldControl error={!!form.formState.errors.email}>
                  <InputWrapper>
                    <MailIcon className="size-4" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...form.register('email')}
                    />
                  </InputWrapper>
                </InputFieldControl>
                <InputFieldError
                  message={form.formState.errors?.email?.message}
                />
              </InputField>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
