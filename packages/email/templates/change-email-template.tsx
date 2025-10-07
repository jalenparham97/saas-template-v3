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

interface ChangeEmailProps {
  email?: string;
  link?: string;
}

const ChangeEmailTemplate = ({
  email = 'bukinoshita@example.com',
  link = 'http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000&token=3862779cce10af2342b11eb5d5957ceb6797645a41c329c5200f31c2b741a32d&email=jalenparham97%40gmail.com',
}: ChangeEmailProps) => {
  const baseUrl = 'https://app.saastemplate.com';
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head>
          <title>Change Email Address</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Preview>Change your email address in just one click</Preview>
        <Body className="px-2 py-10 font-sans">
          <Container className="max-w-[600px] bg-white p-[24px] sm:p-[48px]">
            <Img
              src={`${baseUrl}/logo-full-dark.png`}
              alt="SaaS Template Logo"
              width="180"
              className="mb-[32px]"
            />

            <Section className="mt-[8px] mb-[20px]">
              <Heading className="m-0 p-0 text-left text-[28px] font-bold text-[#1f2937]">
                Change Email Address
              </Heading>
            </Section>

            <Section className="mt-[20px]">
              <Text className="text-[16px] leading-[26px] text-[#4b5563]">
                Hi there,
              </Text>
              <Text className="text-[16px] leading-[26px] text-[#4b5563]">
                We received a request to change your email address to{' '}
                <span className="font-bold text-[#1f2937]">{email}</span>. To
                complete the process, please click the button below.
              </Text>
            </Section>

            <Section className="mt-[20px] mb-[40px] text-center">
              <Button
                className="box-border rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href={link}
              >
                Change Email Address
              </Button>
            </Section>

            <Section className="rounded-[8px] border-l-[4px] border-l-[#3b82f6] bg-[#f9fafb] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#4b5563]">
                This link will expire in{' '}
                <span className="font-bold">24 hours</span>. If you didn&apos;t
                request this email change, please ignore this email or contact
                support if you have concerns.
              </Text>
            </Section>

            <Section className="mt-[32px]">
              <Text className="text-[14px] leading-[22px] text-[#6b7280]">
                If the button doesn&apos;t work, copy and paste this URL into
                your browser:
              </Text>
              <Text className="rounded-[4px] border border-[#e5e7eb] bg-[#f9fafb] p-[8px] font-mono text-[14px] break-all text-[#3b82f6]">
                {link}
              </Text>
            </Section>

            <Hr className="my-[16px] border-gray-200" />

            <Section className="border-t border-t-[#e5e7eb]">
              <Text className="text-[14px] leading-[24px] text-[#6b7280]">
                Need help? Contact our support team at{' '}
                <a
                  href="mailto:support@saastemplate.com"
                  className="text-[#3b82f6] no-underline"
                >
                  support@saastemplate.com
                </a>
              </Text>
            </Section>

            <Hr className="my-[16px] border-gray-200" />

            <Text className="m-0 text-[12px] text-gray-400">
              © {currentYear} {APP_NAME}. All rights reserved.
            </Text>

            <Text className="m-0 text-[12px] text-gray-400">MI, USA</Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default ChangeEmailTemplate;
