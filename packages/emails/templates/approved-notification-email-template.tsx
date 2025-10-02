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

interface ApprovedNotificationEmailProps {
  projectName: string;
  requesterName: string;
  approverName: string;
  organizationName: string;
  reviewComments?: string;
  startDate?: string;
  endDate?: string;
  slideCount?: number;
  projectLink: string;
}

export const ApprovedNotificationEmailTemplate = ({
  projectName = "Marketing Campaign Q1",
  requesterName = "John Doe",
  approverName = "Sarah Johnson",
  organizationName = "Acme Inc.",
  reviewComments,
  startDate,
  endDate,
  slideCount = 5,
  projectLink = "https://app.slydeshow.com/projects/123",
}: ApprovedNotificationEmailProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL || "https://app.slydeshow.com";
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>
          Great news! Your project &quot;{projectName}&quot; has been approved
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
              🎉 Project Approved!
            </Heading>

            <Text className="mb-[4px] text-[16px] leading-[24px] text-gray-600">
              Hello{" "}
              <span className="font-bold text-black">{requesterName}</span>,
            </Text>

            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              Great news! Your project{" "}
              <span className="font-bold text-black">
                &quot;{projectName}&quot;
              </span>{" "}
              has been approved by{" "}
              <span className="font-bold text-black">{approverName}</span> in{" "}
              <span className="font-bold text-black">{organizationName}</span>.
            </Text>

            {/* Success Banner */}
            <Section className="mb-[32px] rounded-[8px] border-l-[4px] border-l-[#10b981] bg-[#f0fdf4] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#065f46]">
                <span className="font-bold">🚀 Ready to Deploy:</span> Your
                project is now approved and ready to be deployed to your
                selected locations.
              </Text>
            </Section>

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
                      Status:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[14px] font-bold text-[#10b981]">
                      ✅ APPROVED
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

              <div className="mb-[16px]">
                <Row>
                  <Column className="w-[120px] align-top">
                    <Text className="m-0 text-[14px] font-bold text-[#374151]">
                      Approved by:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="m-0 text-[14px] text-[#1f2937]">
                      {approverName}
                    </Text>
                  </Column>
                </Row>
              </div>

              {reviewComments && (
                <div>
                  <Text className="mb-[8px] text-[14px] font-bold text-[#374151]">
                    Approval comments:
                  </Text>
                  <Text className="m-0 text-[14px] leading-[20px] text-[#1f2937]">
                    {reviewComments}
                  </Text>
                </div>
              )}
            </Section>

            {/* Call to Action */}
            <Section className="mb-[32px] text-center">
              <Button
                className="box-border rounded-[8px] bg-black px-[24px] py-[14px] text-center font-bold text-white no-underline"
                href={projectLink}
              >
                View Project
              </Button>
            </Section>

            {/* Next Steps Section */}
            <Section className="mb-[32px] rounded-[8px] border border-gray-200 bg-[#f8fafc] p-[24px]">
              <Heading className="m-0 mb-[16px] text-[18px] font-bold text-[#1f2937]">
                What&apos;s Next?
              </Heading>

              <Text className="mb-[12px] text-[14px] leading-[22px] text-[#4b5563]">
                • Your project is now approved and will be displayed according
                to the scheduled dates
              </Text>
              <Text className="mb-[12px] text-[14px] leading-[22px] text-[#4b5563]">
                • You can monitor its performance in the project dashboard
              </Text>
              <Text className="m-0 text-[14px] leading-[22px] text-[#4b5563]">
                • Make any necessary updates through the project management
                interface
              </Text>
            </Section>

            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-600">
              Congratulations on your approved project! We&apos;re excited to
              see it in action.
            </Text>

            <Hr className="my-[24px] border-gray-200" />

            <Text className="text-[14px] leading-[20px] text-gray-500">
              If you have any questions about your approved project or need
              assistance, please don&apos;t hesitate to reach out to your
              organization administrators.
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

export default ApprovedNotificationEmailTemplate;
