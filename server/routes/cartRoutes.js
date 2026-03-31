router.post("/create", async (req, res) => {
    try {
        const { userId, userEmail, items, total } = req.body;

        const newOrder = new Order({
            userId,
            userEmail,
            items,
            total,
            status: "pending"
        });

        await newOrder.save();

        res.json({ message: "Order created", order: newOrder });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});