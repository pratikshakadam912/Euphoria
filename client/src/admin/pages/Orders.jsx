import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        fetch("https://euphoria-ooqv.onrender.com/api/orders")
            .then(res => res.json())
            .then(data => setOrders(data));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 🔥 UPDATE STATUS
    const updateStatus = async (id, newStatus) => {
        await fetch(`https://euphoria-ooqv.onrender.com/api/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        });

        fetchOrders(); // refresh
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>All Orders</h2>

            {orders.map(order => (
                <div key={order._id} style={{
                    border: "1px solid #ccc",
                    margin: 10,
                    padding: 15,
                    borderRadius: 8
                }}>

                    <p><b>User:</b> {order.userEmail}</p>

                    <p><b>Payment:</b> {order.paymentMethod}</p>
                    <p><b>Payment ID:</b> {order.paymentId || "N/A"}</p>

                    <p><b>Total:</b> ₹{order.total}</p>

                    <p><b>Status:</b> {order.status}</p>

                    {/* 🔥 BUTTONS */}
                    <div style={{ marginTop: 10 }}>
                        <button onClick={() => updateStatus(order._id, "shipped")}>
                            Ship
                        </button>

                        <button onClick={() => updateStatus(order._id, "delivered")}>
                            Deliver
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Orders;