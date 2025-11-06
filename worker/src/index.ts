interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  ALLOWED_ORIGINS?: string;
}

type ServiceRequestPayload = {
  name: string;
  phone: string;
  email?: string;
  device?: string;
  issue: string;
  zip?: string;
  time?: string;
  source?: string;
  submittedAt?: string;
};

const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const MAX_TEXT_LENGTH = 1200;
const SERVICE_PATH = '/service-request';
const HEALTH_PATH = '/health';

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const REQUIRED_FIELDS: Array<keyof ServiceRequestPayload> = ['name', 'phone', 'issue'];

const buildCorsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  Vary: 'Origin',
});

const parseAllowedOrigins = (raw?: string): string[] =>
  raw
    ? raw
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean)
    : [];

const isOriginAllowed = (origin: string | null, allowedOrigins: string[]): boolean => {
  if (!allowedOrigins.length || allowedOrigins.includes('*')) {
    return true;
  }
  if (!origin) {
    return false;
  }
  return allowedOrigins.includes(origin);
};

const originForResponse = (origin: string | null, allowedOrigins: string[]): string | null => {
  if (!allowedOrigins.length || allowedOrigins.includes('*')) {
    return origin || '*';
  }
  if (origin && allowedOrigins.includes(origin)) {
    return origin;
  }
  return allowedOrigins[0] || '*';
};

const errorResponse = (message: string, status: number, origin?: string | null) => {
  const headers = { ...JSON_HEADERS };
  if (origin !== undefined) {
    Object.assign(headers, buildCorsHeaders(origin));
  }
  return new Response(JSON.stringify({ error: message }), { status, headers });
};

const successResponse = (message: string, origin?: string | null) => {
  const headers = { ...JSON_HEADERS };
  if (origin !== undefined) {
    Object.assign(headers, buildCorsHeaders(origin));
  }
  return new Response(JSON.stringify({ message }), { status: 200, headers });
};

const formatMessage = (payload: ServiceRequestPayload) => {
  const sections: string[] = [
    '🔧 *New Service Request*',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
  ];

  if (payload.email) sections.push(`Email: ${payload.email}`);
  if (payload.zip) sections.push(`Zip: ${payload.zip}`);
  if (payload.device) sections.push(`Appliance: ${payload.device}`);
  if (payload.time) sections.push(`Preferred window: ${payload.time}`);
  sections.push(`Issue: ${payload.issue}`);
  if (payload.source) sections.push(`Source: ${payload.source}`);
  if (payload.submittedAt) sections.push(`Submitted: ${payload.submittedAt}`);

  return sections.join('\n');
};

const validatePayload = (payload: Partial<ServiceRequestPayload>): string | null => {
  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    if (!value || !value.toString().trim()) {
      return `Field "${field}" is required.`;
    }
  }

  if (payload.phone && !PHONE_REGEX.test(payload.phone)) {
    return 'Please provide a valid phone number.';
  }

  if (payload.issue && payload.issue.length > MAX_TEXT_LENGTH) {
    return 'Issue description is too long.';
  }

  return null;
};

const sendTelegramMessage = async (env: Env, message: string) => {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const telegramResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    const body = await telegramResponse.text();
    throw new Error(`Telegram API error: ${body}`);
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === HEALTH_PATH && request.method === 'GET') {
      return new Response('ok', {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }

    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS);
    const originHeader = request.headers.get('Origin');
    const originIsAllowed = !originHeader || isOriginAllowed(originHeader, allowedOrigins);
    const corsOrigin = originIsAllowed ? originForResponse(originHeader, allowedOrigins) : undefined;

    if (url.pathname !== SERVICE_PATH) {
      return errorResponse('Not found', 404, corsOrigin);
    }

    if (!originIsAllowed) {
      return errorResponse('Origin not allowed', 403);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(corsOrigin ?? null),
      });
    }

    if (request.method !== 'POST') {
      return errorResponse('Method not allowed', 405, corsOrigin);
    }

    let payload: Partial<ServiceRequestPayload>;
    try {
      payload = await request.json();
    } catch {
      return errorResponse('Malformed JSON body.', 400, corsOrigin);
    }

    const validationMessage = validatePayload(payload);
    if (validationMessage) {
      return errorResponse(validationMessage, 422, corsOrigin);
    }

    const normalized: ServiceRequestPayload = {
      name: payload.name!.trim(),
      phone: payload.phone!.trim(),
      email: payload.email?.trim(),
      device: payload.device?.trim(),
      issue: payload.issue!.trim(),
      zip: payload.zip?.trim(),
      time: payload.time?.trim(),
      source: payload.source?.trim(),
      submittedAt: payload.submittedAt?.trim(),
    };

    try {
      await sendTelegramMessage(env, formatMessage(normalized));
    } catch (error) {
      console.error(error);
      return errorResponse('Unable to notify the service team. Please try again soon.', 502, corsOrigin);
    }

    return successResponse('Thanks! Our dispatcher will reach out shortly to confirm.', corsOrigin);
  },
} satisfies ExportedHandler<Env>;
