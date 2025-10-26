import { render } from '@react-email/components';
import { Resend } from 'resend';

import { env } from './env';

const resend = new Resend(env.RESEND_API_KEY);

export { render, resend };
