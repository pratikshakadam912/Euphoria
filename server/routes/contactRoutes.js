import express from "express";
import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log("Contact request received");

        const { name, email, subject, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        console.log("Saved to MongoDB");

        await sendEmail(
            name,
            email,
            subject,
            message
        );

        console.log("Email sent");

        res.status(201).json({
            success: true,
            contact,
        });
    } catch (error) {
        console.error("CONTACT ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;