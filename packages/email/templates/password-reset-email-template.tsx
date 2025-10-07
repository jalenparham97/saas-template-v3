// import { APP_NAME } from '@/libs/constants';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const APP_NAME = 'SaaS Template';

interface Props {
  link?: string;
  email?: string;
}

const PasswordResetEmailTemplate = ({
  link = 'http://localhost:3000/reset-password',
  email = 'jalenparham@gmail.com',
}: Props) => {
  const baseUrl = 'https://app.saastemplate.com';
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head>
          <title>Password Reset Request</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Preview>Reset your password in just one click</Preview>
        <Body className="px-2 py-10 font-sans">
          <Container className="max-w-[600px] bg-white p-[24px] sm:p-[48px]">
            {/* <Img
              src={`${baseUrl}/logo-full-dark.png`}
              alt="SaaS Template Logo"
              width="180"
              className="mb-[32px]"
            /> */}

            <Section className="mt-[8px] mb-[20px]">
              <Heading className="m-0 p-0 text-left text-[28px] font-bold text-[#1f2937]">
                Reset Your Password
              </Heading>
            </Section>

            <Section className="mt-[20px]">
              <Text className="text-[16px] leading-[26px] text-[#4b5563]">
                Hi, <strong className="text-black">{email}</strong>
              </Text>
              <Text className="text-[16px] leading-[26px] text-[#4b5563]">
                We received a request to reset your password. Don&apos;t worry,
                we&apos;re here to help you regain access to your account.
              </Text>
              <Text className="text-[16px] leading-[26px] font-medium text-[#4b5563]">
                Simply click the secure button below to set a new password:
              </Text>
            </Section>

            <Section className="mt-[20px] mb-[40px] text-center">
              <Button
                className="box-border rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href={link}
              >
                Reset My Password
              </Button>
            </Section>

            <Section className="rounded-[8px] border-l-[4px] border-l-[#3b82f6] bg-[#f9fafb] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#4b5563]">
                This link will expire in{' '}
                <span className="font-bold">24 hours</span>. If you didn&apos;t
                request a password reset, please ignore this email or contact
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

export default PasswordResetEmailTemplate;

// import { FooterCenter } from "@/emails/components/footer";
// import { Header } from "@/emails/components/header";
// import {
//   button,
//   container,
//   h1,
//   text,
//   wrapper,
// } from "@/emails/components/sharedStyles";
// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Link,
//   Section,
//   Tailwind,
//   Text,
// } from "@react-email/components";
// import * as React from "react";

// interface Props {
//   link?: string;
//   email?: string;
// }

// const PasswordResetEmailTemplate = ({
//   link = "http://localhost:3000/auth/reset-password",
//   email = "jalenparham97@gmail.com",
// }: Props) => {
//   return (
//     <Html>
//       <Head />
//       <Tailwind>
//         <Body style={wrapper}>
//           <Container style={wrapper}>
//             <Container style={container}>
//               <Header />
//               <Section className="px-6 py-10">
//                 <Heading style={{ ...h1 }}>Reset password</Heading>
//                 <Text style={text} className="py-2">
//                   Hi, <strong className="text-black">{email}</strong>,
//                 </Text>
//                 <Text style={text} className="pb-4">
//                   We received a request to reset the password for your account.
//                   To complete the password reset process, please click the
//                   button below.
//                 </Text>
//                 <Button style={button} href={link}>
//                   Reset password
//                 </Button>

//                 <Text style={text} className="pt-4">
//                   If you didn&apos;t request this action, you can safely ignore
//                   this email and your password will not be changed.
//                 </Text>
//                 <Text style={text} className="pt-4">
//                   Have questions? We&apos;re here to help.{" "}
//                   <Link
//                     href={`mailto:support@formbox.app`}
//                     className="text-blue-600 no-underline"
//                   >
//                     Contact our support team
//                   </Link>
//                 </Text>
//               </Section>
//               <FooterCenter />
//             </Container>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// PasswordResetEmailTemplate.PreviewProps = {};

// export default PasswordResetEmailTemplate;
