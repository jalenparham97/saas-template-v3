import { APP_NAME } from "@/libs/constants";
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
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ApprovalNotificationEmailProps {
  projectName: string;
  requesterName: string;
  requesterEmail: string;
  organizationName: string;
  comments?: string;
  startDate?: string;
  endDate?: string;
  slideCount?: number;
  approvalLink: string;
}

export const ApprovalNotificationEmailTemplate = ({
  projectName = "Marketing Campaign Q1",
  requesterName = "John Doe",
  requesterEmail = "john@example.com",
  organizationName = "Acme Inc.",
  comments,
  startDate,
  endDate,
  slideCount = 5,
  approvalLink = "https://app.slydeshow.com/approvals",
}: ApprovalNotificationEmailProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL || "https://app.slydeshow.com";
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>
          New project approval request: {projectName} by {requesterName}
        </Preview>
        <Body className="px-2 py-10 font-sans">
          <Container className="max-w-[600px] bg-white p-[24px] sm:p-[48px]">
            <Img
              src={`${baseUrl}/logo-full-dark.png`}
              alt="SlydeShow Logo"
              width="180"
              className="mb-[32px]"
            />

            <Heading className="m-0 mb-[24px] p-0 text-left text-[28px] font-bold text-[#1f2937]">
              Project Approval Request
            </Heading>

            <Text className="mb-[4px] text-[16px] leading-[24px] text-gray-600">
              Hello,
            </Text>

            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              <span className="font-bold text-black">{requesterName}</span> (
              <span className="text-[#3b82f6]">{requesterEmail}</span>) has
              submitted a new project for approval in{" "}
              <span className="font-bold text-black">{organizationName}</span>.
            </Text>

            {/* Project Details Section */}
            <Section className="mb-[32px] rounded-[8px] border border-gray-200 bg-[#f9fafb] p-[24px]">
              <Heading className="m-0 mb-[16px] text-[20px] font-bold text-[#1f2937]">
                Project Details
              </Heading>

              <div className="mb-[16px]">
                <Row>
                  <Column className="w-[120px] align-top">
                    <Text className="m-0 text-[14px] font-bold text-[#374151]">
                      Project Name:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[14px] text-[#1f2937]">
                      {projectName}
                    </Text>
                  </Column>
                </Row>
              </div>

              <div className="mb-[16px]">
                <Row>
                  <Column className="w-[120px] align-top">
                    <Text className="m-0 text-[14px] font-bold text-[#374151]">
                      Slides:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[14px] text-[#1f2937]">
                      {slideCount} slide{slideCount !== 1 ? "s" : ""}
                    </Text>
                  </Column>
                </Row>
              </div>

              <div className="mb-[16px]">
                <Row>
                  <Column className="w-[120px] align-top">
                    <Text className="m-0 text-[14px] font-bold text-[#374151]">
                      Start Date:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[14px] text-[#1f2937]">
                      {startDate}
                    </Text>
                  </Column>
                </Row>
              </div>

              <div className="mb-[16px]">
                <Row>
                  <Column className="w-[120px] align-top">
                    <Text className="m-0 text-[14px] font-bold text-[#374151]">
                      End Date:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[14px] text-[#1f2937]">
                      {endDate}
                    </Text>
                  </Column>
                </Row>
              </div>

              {comments && (
                <div>
                  <Text className="mb-[8px] text-[14px] font-bold text-[#374151]">
                    Comments from requester:
                  </Text>
                  <Text className="m-0 text-[14px] leading-[20px] text-[#1f2937]">
                    {comments}
                  </Text>
                </div>
              )}
            </Section>

            {/* Call to Action */}
            <Section className="mb-[32px] text-center">
              <Button
                className="box-border rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href={approvalLink}
              >
                Review Request
              </Button>
            </Section>

            {/* Info Box */}
            <Section className="mb-[24px] rounded-[8px] border-l-[4px] border-l-[#3b82f6] bg-[#f9fafb] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#4b5563]">
                <span className="font-bold">Action Required:</span> This project
                is waiting for your approval. Please review the project details
                and either approve or reject the submission.
              </Text>
            </Section>

            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-600">
              Thank you for your attention to this approval request.
            </Text>

            <Hr className="my-[24px] border-gray-200" />

            <Text className="text-[14px] leading-[20px] text-gray-500">
              This email was sent because you have admin permissions in{" "}
              {organizationName}. If you have any questions about this approval
              request, please contact the requester directly.
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

export default ApprovalNotificationEmailTemplate;
