// import { APP_NAME } from '@/libs/constants';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const APP_NAME = 'SaaS Template';

const baseUrl = 'https://www.fireball.email/fireball-assets/';

export const WelcomeEmailTemplate = () => {
  const logoBaseUrl = 'https://app.saastemplate.com';
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head>
          <title>Welcome to {APP_NAME}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Preview>
          Welcome to {APP_NAME} - Get started with your first form
        </Preview>
        <Body className="px-2 py-10 font-sans">
          <Container className="max-w-[600px] bg-white p-[24px] sm:p-[48px]">
            <Img
              src={`${logoBaseUrl}/logo-full-dark.png`}
              alt="SaaS Template Logo"
              width="180"
              className="mx-auto mb-[40px]"
            />

            <Section className="mt-[8px] mb-[12px] text-center">
              <Heading className="m-0 p-0 text-center text-[22px] font-bold text-[#1f2937] sm:text-[28px]">
                Welcome to {APP_NAME}
              </Heading>
            </Section>

            <Section className="mt-[12px] text-center">
              <Text className="text-[16px] leading-[26px] text-[#4b5563]">
                We&apos;re excited to have you on board. Here are some tips to
                help you get started quickly:
              </Text>
            </Section>

            <Section className="mt-[24px] mb-[24px] text-center">
              <Button
                className="box-border w-full rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href="https://app.saastemplate.com"
              >
                Get Started
              </Button>
            </Section>

            <Hr className="my-[24px] border-gray-200" />

            <Section className="mt-[32px]">
              <Heading className="m-0 mb-[24px] text-[20px] font-bold text-[#1f2937]">
                Tips for getting started
              </Heading>

              <div className="mb-[24px]">
                <Row>
                  <Column className="w-16 align-top">
                    <Img
                      src={`${baseUrl}/play.png`}
                      className="mt-1"
                      width="48"
                      height="48"
                      alt=""
                    />
                  </Column>
                  <Column className="pl-4">
                    <Heading className="m-0 mb-[8px] text-[16px] font-bold text-[#1f2937]">
                      Quick start
                    </Heading>
                    <Text className="m-0 mb-[8px] text-[14px] leading-[22px] text-[#4b5563]">
                      Follow our quick start guide to get up and running with
                      your first form in no time.
                    </Text>
                    <Link
                      href="https://docs.saastemplate.com/introduction"
                      className="text-[14px] text-[#3b82f6] no-underline"
                    >
                      Create your first form
                    </Link>
                  </Column>
                </Row>
              </div>

              <div className="mb-[24px]">
                <Row>
                  <Column className="w-16 align-top">
                    <Img
                      src={`${baseUrl}/help.png`}
                      className="mt-1"
                      width="48"
                      height="48"
                      alt=""
                    />
                  </Column>
                  <Column className="pl-4">
                    <Heading className="m-0 mb-[8px] text-[16px] font-bold text-[#1f2937]">
                      Need help?
                    </Heading>
                    <Text className="m-0 mb-[8px] text-[14px] leading-[22px] text-[#4b5563]">
                      Our support team is here to assist you with any questions
                      you might have.
                    </Text>
                    <Link
                      href="https://saastemplate.com/contact"
                      className="text-[14px] text-[#3b82f6] no-underline"
                    >
                      Help and contact
                    </Link>
                  </Column>
                </Row>
              </div>

              <div className="mb-[24px]">
                <Row>
                  <Column className="w-16 align-top">
                    <Img
                      src={`${baseUrl}/docs.png`}
                      className="mt-1"
                      width="48"
                      height="48"
                      alt=""
                    />
                  </Column>
                  <Column className="pl-4">
                    <Heading className="m-0 mb-[8px] text-[16px] font-bold text-[#1f2937]">
                      Docs
                    </Heading>
                    <Text className="m-0 mb-[8px] text-[14px] leading-[22px] text-[#4b5563]">
                      Access our comprehensive documentation to explore all
                      features and capabilities.
                    </Text>
                    <Link
                      href="https://docs.saastemplate.com"
                      className="text-[14px] text-[#3b82f6] no-underline"
                    >
                      Documentation
                    </Link>
                  </Column>
                </Row>
              </div>
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

export default WelcomeEmailTemplate;
