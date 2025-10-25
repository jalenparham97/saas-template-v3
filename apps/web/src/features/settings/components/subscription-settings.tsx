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
              View and manage your subscription plan.
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
          </CardContent>
          <CardFooter className="py-4">
            <Button>Manage Subscription</Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h2 className="text-base leading-7 font-semibold text-red-600">
            Cancel Subscription
          </h2>
          <p className="mt-1 text-[15px] leading-6 text-gray-500">
            Cancel your subscription and downgrade to the free plan. You can
            always upgrade later.
          </p>
        </div>
        <Card className="md:col-span-2" variant="accent">
          <CardHeader>
            <CardTitle className="text-destructive">
              Cancel Subscription
            </CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Cancel your subscription and downgrade to the free plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CardDescription className="leading-6 text-gray-500">
              Easily cancel your subscription at any time. You will have access
              to all features until the end of your current billing period.
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
