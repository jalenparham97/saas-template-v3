import { SettingsSection } from '@/features/settings/components/settings-section';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';

export function SubscriptionSettings() {
  return (
    <div className="space-y-10">
      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">Current Plan</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Manage your subscription and billing information.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              View and upgrade your subscription plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Free Plan</h3>
                  <Badge variant="secondary">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Basic features with limited usage
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$0</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Plan includes:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Basic features</li>
                <li>• Limited usage</li>
                <li>• Community support</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="py-4">
            <Button>Upgrade Plan</Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Billing Information
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            View and manage your billing details.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Manage payment methods and billing details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium">N/A</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium">No payment method</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="py-4">
            <Button variant="outline" disabled>
              Manage Billing
            </Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">Usage</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Track your current usage and limits.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Monitor your plan usage and limits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">API Calls</span>
                <span className="font-medium">0 / 1,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium">0 MB / 100 MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Team Members</span>
                <span className="font-medium">1 / 1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h2 className="text-base leading-7 font-semibold text-red-600">
            Danger Zone
          </h2>
          <p className="mt-1 text-[15px] leading-6 text-gray-500">
            Irreversible actions for your account.
          </p>
        </div>
        <Card className="md:col-span-2" variant="accent">
          <CardHeader>
            <CardTitle className="text-base font-medium text-destructive">
              Cancel Subscription
            </CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Cancel your subscription and lose access to premium features.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CardDescription className="leading-6 text-gray-500">
              Canceling your subscription will immediately revoke access to all
              premium features. You will be downgraded to the free plan at the
              end of your current billing period.
            </CardDescription>
          </CardContent>
          <CardFooter className="py-4">
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>
      </SettingsSection>
    </div>
  );
}
