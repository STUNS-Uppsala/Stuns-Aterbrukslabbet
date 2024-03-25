import { Resend } from "resend";

interface SendMailProps {
  toMail: string;
  subject: string;
  mailTemplate: React.ReactNode;
}

export default function sendMail({
  toMail,
  subject,
  mailTemplate,
}: SendMailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const sendingMail = process.env.RESEND_SENDING_MAIL;

  if (!sendingMail || !process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error(
      "Check your .env file and make sure you have a sending mail and a site url"
    );
  }

  resend.emails.send({
    from: `Återbrukslabbet <${sendingMail}>`,
    to: toMail,
    subject: subject,
    text: "",
    react: mailTemplate,
  });
}
