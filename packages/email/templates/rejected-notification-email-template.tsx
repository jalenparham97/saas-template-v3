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
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const APP_NAME = 'SaaS Template';

interface RejectedNotificationEmailProps {
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

export const RejectedNotificationEmailTemplate = ({
  projectName = "Marketing Campaign Q1",
  requesterName = "John Doe",
  approverName = "Sarah Johnson",
  organizationName = "Acme Inc.",
  reviewComments,
  startDate = "No date provided",
  endDate = "No date provided",
  slideCount = 5,
  projectLink = "https://app.saastemplate.com/projects/123",
}: RejectedNotificationEmailProps) => {
  const baseUrl = "https://app.saastemplate.com";
  const currentYear = new Date().getFullYear();

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>
          Update: your project &quot;{projectName}&quot; was not approved
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
              ❌ Project Not Approved
            </Heading>

            <Text className="mb-[4px] text-[16px] leading-[24px] text-gray-600">
              Hello{" "}
              <span className="font-bold text-black">{requesterName}</span>,
            </Text>

            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-600">
              We reviewed your project{" "}
              <span className="font-bold text-black">
                &quot;{projectName}&quot;
              </span>{" "}
              for
              <span className="font-bold text-black"> {organizationName}</span>,
              and it was not approved by
              <span className="font-bold text-black"> {approverName}</span>.
            </Text>

            {/* Rejection Banner */}
            <Section className="mb-[32px] rounded-[8px] border-l-[4px] border-l-[#ef4444] bg-[#fff1f2] p-[16px]">
              <Text className="m-0 text-[14px] leading-[22px] text-[#7f1d1d]">
                <span className="font-bold">Next steps:</span> Review the
                comments below, make the requested changes, and resubmit the
                project for approval when ready.
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
                    <Text className="m-0 text-[14px] font-bold text-[#ef4444]">
                      ❌ REJECTED
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
                      Reviewed by:
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
                    Reviewer comments:
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

            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-600">
              If you have questions about this decision or need help updating
              your project, please contact your organization administrators.
            </Text>

            <Hr className="my-[24px] border-gray-200" />

            <Text className="text-[14px] leading-[20px] text-gray-500">
              If you believe this decision was made in error, you may resubmit
              after making updates or reach out to the approver for
              clarification.
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

export default RejectedNotificationEmailTemplate;
