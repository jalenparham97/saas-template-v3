import { APP_NAME } from "@/libs/constants";
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
} from "@react-email/components";

interface Props {
  organizationName: string;
  inviterName: string;
  inviteeEmail: string;
  invitationLink: string;
}

const InvitationEmail = ({
  organizationName = "Acme Inc.",
  inviterName = "Sarah Johnson",
  inviteeEmail = "email@example.com",
  invitationLink = "https://example.com/accept-invitation",
}: Props) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL || "https://app.slydeshow.com";

  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>You&apos;ve been invited to join {organizationName}</Preview>
        <Body className="px-2 py-10 font-sans">
          <Container className="max-w-[600px] bg-white p-[24px] sm:p-[48px]">
            <Img
              src={`${baseUrl}/logo-full-dark.png`}
              alt="SlydeShow Logo"
              width="180"
              className="mb-[32px]"
            />
            <Heading className="m-0 mb-[24px] p-0 text-left text-[28px] font-bold text-[#1f2937]">
              Join {organizationName}
            </Heading>

            <Text className="mb-[4px] text-[16px] leading-[24px] text-gray-600">
              Hello,{" "}
              <span className="font-bold text-black">{inviteeEmail}</span>
            </Text>

            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              <span className="font-bold text-black">{inviterName}</span> has
              invited you to collaborate on{" "}
              <span className="font-bold text-black">
                {organizationName}&apos;s
              </span>{" "}
              workspace. Join now to collaborate on shared projects and more.
            </Text>

            <Section className="mt-[30px] mb-[40px] text-center">
              <Button
                className="box-border rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href={invitationLink}
              >
                Accept Invitation
              </Button>
            </Section>

            <Section className="mb-[24px] rounded-[8px] border-l-[4px] border-l-[#3b82f6] bg-[#f9fafb] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#4b5563]">
                This invitation will expire in{" "}
                <span className="font-bold">7 days</span> days. If you have any
                questions, simply reply to this email.
              </Text>
            </Section>

            {/* <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              This invitation will expire in 7 days. If you have any questions,
              simply reply to this email.
            </Text> */}

            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-600">
              We&apos;re excited to have you on board!
            </Text>

            <Hr className="my-[24px] border-gray-200" />

            <Text className="text-[14px] leading-[20px] text-gray-500">
              If you weren&apos;t expecting this invitation, you can safely
              ignore this email.
            </Text>

            <Hr className="my-[24px] border-gray-200" />

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

export default InvitationEmail;

// import { FooterCenter } from "@/emails/components/footer";
// import { Header } from "@/emails/components/header";
// import {
//   button,
//   container,
//   h1,
//   text,
//   wrapper,
// } from "@/emails/components/sharedStyles";
// import { APP_NAME as COMPANY_NAME } from "@/libs/constants";
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

// type Props = {
//   orgName: string;
//   link?: string;
// };

// const OrgInviteEmailTemplate = ({
//   orgName = "Some Company",
//   link = "http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000&token=3862779cce10af2342b11eb5d5957ceb6797645a41c329c5200f31c2b741a32d&email=jalenparham97%40gmail.com",
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
//                 <Heading style={{ ...h1 }}>Invitation</Heading>
//                 <Text style={text} className="pb-4">
//                   You&apos;ve been invited to join the{" "}
//                   <span style={{ fontWeight: 600, color: "black" }}>
//                     {orgName}
//                   </span>{" "}
//                   organization on {COMPANY_NAME}!
//                 </Text>
//                 <Button style={button} href={link}>
//                   Join organization
//                 </Button>

//                 <Text style={text} className="pt-4">
//                   Or copy and paste this URL into a new tab of your browser:
//                 </Text>
//                 <Text className="max-w-[500px] break-words text-sm text-black">
//                   <Link href={link} className="text-blue-600 no-underline">
//                     {link}
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

// OrgInviteEmailTemplate.PreviewProps = {};

// export default OrgInviteEmailTemplate;
