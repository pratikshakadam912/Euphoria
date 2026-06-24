import nodemailer from "nodemailer";

const sendEmail = async (name, email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,

        subject: `New Contact Form Message - ${subject}`,

        html: `
      <h2>New Contact Form Submission</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>

      <h3>Message:</h3>
      <p>${message}</p>
    `,
    });
};

export default sendEmail;