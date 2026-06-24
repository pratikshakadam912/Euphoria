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

    transporter.verify((error, success) => {
        if (error) {
            console.log("VERIFY ERROR:", error);
        } else {
            console.log("Server ready");
        }
    });

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