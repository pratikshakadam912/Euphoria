import nodemailer from "nodemailer";

const sendEmail = async (name, email, subject, message) => {
  try {
    console.log("Starting email service...");
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Check SMTP connection before sending
    await transporter.verify();

    console.log("SMTP connection verified successfully.");

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

    console.log("Email sent successfully.");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("=================================");
    console.error("EMAIL ERROR");
    console.error("=================================");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    console.error("Response Code:", error.responseCode);
    console.error("=================================");

    throw error;
  }
};

export default sendEmail;
