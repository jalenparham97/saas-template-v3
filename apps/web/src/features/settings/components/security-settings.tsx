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
import { Label } from '@workspace/ui/components/label';
import { Separator } from '@workspace/ui/components/separator';
import { Switch } from '@workspace/ui/components/switch';

export function SecuritySettings() {
  return (
    <div className="space-y-10">
      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">Password</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Change your password to keep your account secure.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Update your password regularly to maintain account security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <InputField>
              <InputFieldLabel>Current Password</InputFieldLabel>
              <InputFieldControl>
                <Input type="password" />
              </InputFieldControl>
            </InputField>
            <InputField>
              <InputFieldLabel>New Password</InputFieldLabel>
              <InputFieldControl>
                <Input type="password" />
              </InputFieldControl>
            </InputField>
            <InputField>
              <InputFieldLabel>Confirm New Password</InputFieldLabel>
              <InputFieldControl>
                <Input type="password" />
              </InputFieldControl>
            </InputField>
          </CardContent>
          <CardFooter className="py-4">
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Two-Factor Authentication
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Add an extra layer of security to your account.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Require a verification code in addition to your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                <Label>Enable 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  Require a verification code in addition to your password.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter className="py-4">
            <Button variant="outline" disabled>
              Configure
            </Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">Active Sessions</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Manage your active sessions across devices.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Monitor and manage where you're signed in.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              You are currently signed in on 1 device.
            </p>
          </CardContent>
          <CardFooter className="py-4">
            <Button variant="destructive">Sign Out All Devices</Button>
          </CardFooter>
        </Card>
      </SettingsSection>
    </div>
  );
}
