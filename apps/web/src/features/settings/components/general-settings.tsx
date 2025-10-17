import { SettingsSection } from '@/features/settings/components/settings-section';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { Separator } from '@workspace/ui/components/separator';

export function GeneralSettings() {
  return (
    <div className="space-y-10">
      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Profile Information
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Set your name and contact information, the email address entered
            here is used for your login access.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Update your personal information and profile details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <InputField>
              <InputFieldLabel>Full Name</InputFieldLabel>
              <InputFieldControl>
                <Input />
              </InputFieldControl>
            </InputField>
            <InputField>
              <InputFieldLabel>Email</InputFieldLabel>
              <InputFieldControl>
                <Input type="email" />
              </InputFieldControl>
            </InputField>
          </CardContent>
          <CardFooter className="py-4">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h2 className="text-base leading-7 font-semibold text-red-600">
            Danger Zone
          </h2>
          <p className="mt-1 text-[15px] leading-6 text-gray-500">
            Be careful, some of these actions are not reversible.
          </p>
        </div>

        <Card className="md:col-span-2" variant="accent">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Delete your account
            </CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Permanently delete your account, and all associated data with it.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CardDescription className="leading-6 text-gray-500">
              Permanently delete your account, and all associated data with it.
              We will also cancel any associated subscriptions. This action
              cannot be undone - please proceed with caution.
            </CardDescription>
          </CardContent>
          <CardFooter className="py-4">
            <Button variant="destructive">Delete my account</Button>
          </CardFooter>
        </Card>
      </SettingsSection>
    </div>
  );
}
