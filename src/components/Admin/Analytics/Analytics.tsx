import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import "./Analytics.css";

type AnalyticsEvent = {
  id: number;
  event_type: string;
  visitor_id: string | null;
  session_id: string | null;
  product_id: string | null;
  product_name: string | null;
  marketplace: string | null;
  department: string | null;
  category: string | null;
  subcategory: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  page_url: string | null;
  created_at: string;
};

type ProductStat = {
  name: string;
  views: number;
  clicks: number;
};

type SourceStat = {
  source: string;
  visitors: number;
  views: number;
  clicks: number;
};

export default function Analytics() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  const fetchAnalytics = async () => {
    setLoading(true);

    const startDate = new Date();

    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("analytics_events")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("ANALYTICS FETCH ERROR:", error);
      setLoading(false);
      return;
    }

    setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  // ----------------------------------------
  // BASIC STATS
  // ----------------------------------------

  const visitors = new Set(
    events
      .filter((event) => event.visitor_id)
      .map((event) => event.visitor_id)
  ).size;

  const productViews = events.filter(
    (event) => event.event_type === "product_view"
  ).length;

  const shopClicks = events.filter(
    (event) => event.event_type === "shop_now_click"
  ).length;

  const ctr =
    productViews > 0
      ? ((shopClicks / productViews) * 100).toFixed(2)
      : "0.00";

  // ----------------------------------------
  // PRODUCT STATS
  // ----------------------------------------

  const productMap: Record<string, ProductStat> = {};

  events.forEach((event) => {
    if (!event.product_id) return;

    if (!productMap[event.product_id]) {
      productMap[event.product_id] = {
        name: event.product_name || "Unknown Product",
        views: 0,
        clicks: 0,
      };
    }

    if (event.event_type === "product_view") {
      productMap[event.product_id].views++;
    }

    if (event.event_type === "shop_now_click") {
      productMap[event.product_id].clicks++;
    }
  });

  const topProducts = Object.values(productMap)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  // ----------------------------------------
  // TRAFFIC SOURCE STATS
  // ----------------------------------------

  const sourceMap: Record<string, SourceStat> = {};

  events.forEach((event) => {
    const source = event.source || "unknown";

    if (!sourceMap[source]) {
      sourceMap[source] = {
        source,
        visitors: 0,
        views: 0,
        clicks: 0,
      };
    }

    if (event.event_type === "product_view") {
      sourceMap[source].views++;
    }

    if (event.event_type === "shop_now_click") {
      sourceMap[source].clicks++;
    }
  });

  // Count unique visitors by source
  const sourceVisitors: Record<string, Set<string>> = {};

  events.forEach((event) => {
    const source = event.source || "unknown";

    if (!sourceVisitors[source]) {
      sourceVisitors[source] = new Set();
    }

    if (event.visitor_id) {
      sourceVisitors[source].add(event.visitor_id);
    }
  });

  Object.keys(sourceMap).forEach((source) => {
    sourceMap[source].visitors =
      sourceVisitors[source]?.size || 0;
  });

  const topSources = Object.values(sourceMap).sort(
    (a, b) => b.clicks - a.clicks
  );

  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <div>
          <h1>Analytics</h1>

          <p>
            Track visitors, products and Shop Now clicks.
          </p>
        </div>

        <select
          value={days}
          onChange={(e) =>
            setDays(Number(e.target.value))
          }
        >
          <option value={1}>Last 24 Hours</option>
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>

      </div>

      {loading ? (
        <div className="analytics-loading">
          Loading analytics...
        </div>
      ) : (
        <>

          {/* SUMMARY CARDS */}

          <div className="analytics-cards">

            <div className="analytics-card">
              <span>Visitors</span>
              <strong>{visitors}</strong>
            </div>

            <div className="analytics-card">
              <span>Product Views</span>
              <strong>{productViews}</strong>
            </div>

            <div className="analytics-card">
              <span>Shop Now Clicks</span>
              <strong>{shopClicks}</strong>
            </div>

            <div className="analytics-card">
              <span>Shop Now CTR</span>
              <strong>{ctr}%</strong>
            </div>

          </div>


          {/* TRAFFIC SOURCES */}

          <div className="analytics-section">

            <h2>Traffic Sources</h2>

            {topSources.length === 0 ? (
              <p className="analytics-empty">
                No traffic data yet.
              </p>
            ) : (

              <div className="analytics-table-wrapper">

                <table className="analytics-table">

                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Visitors</th>
                      <th>Product Views</th>
                      <th>Shop Now</th>
                    </tr>
                  </thead>

                  <tbody>

                    {topSources.map((item) => (
                      <tr key={item.source}>

                        <td>
                          {item.source}
                        </td>

                        <td>
                          {item.visitors}
                        </td>

                        <td>
                          {item.views}
                        </td>

                        <td>
                          {item.clicks}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>


          {/* TOP PRODUCTS */}

          <div className="analytics-section">

            <h2>Top Products</h2>

            {topProducts.length === 0 ? (
              <p className="analytics-empty">
                No product data yet.
              </p>
            ) : (

              <div className="analytics-table-wrapper">

                <table className="analytics-table">

                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Views</th>
                      <th>Shop Now</th>
                      <th>CTR</th>
                    </tr>
                  </thead>

                  <tbody>

                    {topProducts.map((product) => {

                      const productCtr =
                        product.views > 0
                          ? (
                              (product.clicks /
                                product.views) *
                              100
                            ).toFixed(2)
                          : "0.00";

                      return (
                        <tr key={product.name}>

                          <td>
                            {product.name}
                          </td>

                          <td>
                            {product.views}
                          </td>

                          <td>
                            {product.clicks}
                          </td>

                          <td>
                            {productCtr}%
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>


          {/* PLATFORM + PRODUCT */}

          <div className="analytics-section">

            <h2>
              Platform + Product Clicks
            </h2>

            <div className="analytics-table-wrapper">

              <table className="analytics-table">

                <thead>

                  <tr>
                    <th>Platform</th>
                    <th>Product</th>
                    <th>Shop Now Clicks</th>
                  </tr>

                </thead>

                <tbody>

                  {events
                    .filter(
                      (event) =>
                        event.event_type ===
                        "shop_now_click"
                    )
                    .slice(0, 20)
                    .map((event) => (

                      <tr key={event.id}>

                        <td>
                          {event.source || "unknown"}
                        </td>

                        <td>
                          {event.product_name ||
                            "Unknown Product"}
                        </td>

                        <td>1</td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          </div>

        </>
      )}

    </div>
  );
}