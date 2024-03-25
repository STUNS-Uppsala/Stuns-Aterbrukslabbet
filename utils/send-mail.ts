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

  if (!sendingMail) {
    return { error: "Kunde inte hitta mail att skicka ifrån" };
  }

  resend.emails.send({
    from: `Återbrukslabbet <${sendingMail}>`,
    to: "stunsaterbrukslabbet@gmail.com",
    subject: subject,
    text: "",
    react: mailTemplate,
  });
}
