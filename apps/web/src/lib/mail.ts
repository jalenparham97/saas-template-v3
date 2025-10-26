import { APP_NAME } from '@/lib/constants';
import { render, resend } from '@workspace/email';
import ChangeEmailTemplate from '@workspace/email/templates/change-email-template';
import PasswordResetEmailTemplate from '@workspace/email/templates/password-reset-email-template';

const emailFrom = `${APP_NAME} <accounts@relancecrm.com>`;

export async function sendPasswordResetEmail(email: string, link: string) {
  const emailTemplate = PasswordResetEmailTemplate({ email, link });

  const text = await render(emailTemplate, { plainText: true });

  return await resend.emails.send({
    subject: 'Reset your password',
    from: emailFrom,
    to: email,
    text,
    react: emailTemplate,
  });
}

export async function sendEmailChangeEmail(
  email: string,
  newEmail: string,
  link: string
) {
  const emailTemplate = ChangeEmailTemplate({ email: newEmail, link });

  const text = await render(emailTemplate, { plainText: true });

  return await resend.emails.send({
    subject: 'Change your email address',
    from: emailFrom,
    to: email,
    text,
    react: emailTemplate,
  });
}
