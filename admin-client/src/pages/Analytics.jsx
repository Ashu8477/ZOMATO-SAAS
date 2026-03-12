import { useEffect, useState } from 'react';
import { getAnalyticsApi } from '../api/analytics.api';

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAnalyticsApi();
      setData(res.data.data);
    };
    fetch();
  }, []);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Analytics</h1>

      <p>Total Orders: {data.totalOrders}</p>
      <p>Total Revenue: ₹ {data.totalRevenue}</p>
      <p>Pending Orders: {data.pendingOrders}</p>
    </div>
  );
}

export default Analytics;
