import { useEffect, useState } from 'react';
import { getAllOrdersApi, updateOrderStatusApi } from '../api/order.api';

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await getAllOrdersApi();
    setOrders(res.data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await updateOrderStatusApi(id, status);
    fetchOrders();
  };

  return (
    <div>
      <h1>Orders</h1>

      {orders.map((o) => (
        <div key={o._id} style={{ border: '1px solid', margin: 10 }}>
          <p>Order: {o._id}</p>
          <p>Status: {o.orderStatus}</p>
          <p>Total: ₹ {o.totalAmount}</p>

          <select onChange={(e) => updateStatus(o._id, e.target.value)}>
            <option>Change Status</option>
            <option>confirmed</option>
            <option>preparing</option>
            <option>out_for_delivery</option>
            <option>delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Orders;
