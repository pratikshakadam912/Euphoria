import nodemailer from "nodemailer";

const sendEmail = async (name, email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Euphoria Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Message - ${subject}`,
      html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>New Contact Form Submission</h2>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Subject:</strong> ${subject}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        ${message}
                    </p>
                </div>
            `,
    });

    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    throw error;
  }
};

export default sendEmail;
