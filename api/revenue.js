
export default async function handler(req, res) {
    const { universeId } = req.query;

    if (!universeId) {
        return res.status(400).json({ error: 'universeId is required' });
    }

    const API_KEY = process.env.ROBLOX_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'ROBLOX_API_KEY is not configured on the server' });
    }

    try {
        // Fetch revenue metrics for the last 24 hours (approx)
        // Note: Standard Analytics API returns daily buckets
        const url = `https://apis.roblox.com/standard-analytics/v1/universes/${universeId}/metrics?metricTypes=Revenue`;

        const response = await fetch(url, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Roblox API responded with ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        // Extract the latest daily revenue
        // The API returns data points. We'll take the most recent one.
        const revenueMetrics = data.dataPoints || [];
        const latestRevenue = revenueMetrics.length > 0
            ? revenueMetrics[revenueMetrics.length - 1].value
            : 0;

        return res.status(200).json({
            universeId,
            revenue: latestRevenue,
            raw: data // Optional: for debugging
        });
    } catch (error) {
        console.error('Revenue Fetch Error:', error);
        return res.status(500).json({ error: 'Failed to fetch revenue', message: error.message });
    }
}
