// import { APP_NAME } from '@/libs/constants';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const APP_NAME = 'SaaS Template';

interface NewUserEmailProps {
  userEmail: string;
  adminName: string;
  organizationName: string;
  setPasswordLink: string;
  supportEmail?: string;
}

const NewUserEmailTemplate = ({
  userEmail = 'newuser@example.com',
  adminName = 'Admin User',
  organizationName = 'Acme Inc.',
  setPasswordLink = 'https://example.com/set-password',
  supportEmail = 'support@saastemplate.com',
}: NewUserEmailProps) => {
  const baseUrl = 'https://app.saastemplate.com';
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>
          Welcome to {organizationName} on {APP_NAME}!
        </Preview>
        <Body className="px-2 py-10 font-sans">
          <Container className="max-w-[600px] bg-white p-[24px] sm:p-[48px]">
            <Img
              src={`${baseUrl}/logo-full-dark.png`}
              alt="SaaS Template Logo"
              width="180"
              className="mb-[32px]"
            />
            <Heading className="m-0 mb-[24px] p-0 text-left text-[28px] font-bold text-[#1f2937]">
              Welcome to {organizationName}!
            </Heading>

            <Text className="mb-[4px] text-[16px] leading-[24px] text-gray-600">
              Hi, <span className="font-bold text-black">{userEmail}</span>
            </Text>

            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              Your account was created by{' '}
              <span className="font-bold text-black">{adminName}</span>.
              You&apos;re invited to join{' '}
              <span className="font-bold text-black">{organizationName}</span>{' '}
              on {APP_NAME}.
            </Text>

            <Section className="mt-[30px] mb-[40px] text-center">
              <Button
                className="box-border rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href={setPasswordLink}
              >
                Set Up Your Account
              </Button>
            </Section>

            <Section className="mb-[24px] rounded-[8px] border-l-[4px] border-l-[#3b82f6] bg-[#f9fafb] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#4b5563]">
                To keep your account secure, please choose a strong password
                when setting up your account and never share your login details
                with anyone.
              </Text>
            </Section>

            <Section className="mt-[32px]">
              <Text className="text-[14px] leading-[22px] text-[#6b7280]">
                If the button doesn&apos;t work, copy and paste this URL into
                your browser:
              </Text>
              <Text className="rounded-[4px] border border-[#e5e7eb] bg-[#f9fafb] p-[8px] font-mono text-[14px] break-all text-[#3b82f6]">
                {setPasswordLink}
              </Text>
            </Section>

            <Hr className="my-[16px] border-gray-200" />

            <Section className="border-t border-t-[#e5e7eb]">
              <Text className="text-[14px] leading-[24px] text-[#6b7280]">
                Need help? Contact our support team at{' '}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-[#3b82f6] no-underline"
                >
                  {supportEmail}
                </a>
              </Text>
            </Section>

            <Hr className="my-[16px] border-gray-200" />

            <Text className="text-[14px] leading-[20px] text-gray-500">
              If you weren&apos;t expecting this email, you can safely ignore
              it.
            </Text>

            <Text className="m-0 mt-[24px] text-[12px] text-gray-400">
              © {currentYear} {APP_NAME}. All rights reserved.
            </Text>
            <Text className="m-0 text-[12px] text-gray-400">MI, USA</Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default NewUserEmailTemplate;
