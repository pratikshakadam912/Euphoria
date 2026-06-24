import nodemailer from "nodemailer";

const sendEmail = async (name, email, subject, message) => {
    console.log("EMAIL_USER =", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.verify();
    console.log("SMTP verified");

    return await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Message - ${subject}`,
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `,
    });
};

export default sendEmail;