import express from "express";
import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        await sendEmail(
            name,
            email,
            subject,
            message
        );

        res.status(201).json({
            success: true,
            contact,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;