import { useState } from "react";
import { supabase } from "../../../lib/supabase";

import "./ProductMonitor.css";

export default function ProductMonitor({
    setMonitorCount
}:any){

    const [logs,setLogs] = useState<any[]>([]);
    const [notifications,setNotifications] = useState<any[]>([]);
    const [removedProducts,setRemovedProducts] = useState<any[]>([]);
    const [running] = useState(false);
    const [lastRun] = useState("");
    const [unreadCount,setUnreadCount] = useState(0);


    async function loadMonitor(){


        const {data: logData, error: logError} =
        await supabase
        .from("product_check_logs")
        .select(`
            *,
            products(
                title,
                marketplace
            )
        `)
        .order(
            "checked_at",
            {
                ascending:false
            }
        )
        .limit(50);
    
    
    
        console.log(
            "CHECK LOG DATA:",
            logData
        );
    
    
        console.log(
            "CHECK LOG ERROR:",
            logError
        );

        const {data: notificationData, error: notificationError} =
        await supabase
        .from("product_notifications")
        .select(`
            *,
            products(
                title
            )
        `)
        .order(
            "created",
            {
                ascending:false
            }
        )
        .limit(20);
    
    
    
        console.log(
            "NOTIFICATION DATA:",
            notificationData
        );
    
    
        console.log(
            "NOTIFICATION ERROR:",
            notificationError
        );
    
    
    
    
        const {data: removedData, error: removedError} =
        await supabase
        .from("products")
        .select(`
            id,
            title,
            marketplace,
            is_active
        `)
        .eq(
            "is_active",
            false
        );
    
    
    
        console.log(
            "REMOVED PRODUCTS:",
            removedData
        );
    
    
        console.log(
            "REMOVED ERROR:",
            removedError
        );
    
    
    
        setLogs(
            logData || []
        );
    
    
        setNotifications(
            notificationData || []
        );
    
    
    
        const count =
        (notificationData || [])
        .filter(
            item => item.is_read === false
        )
        .length;
    
    
    
        if(setMonitorCount){
    
            setMonitorCount(count);
    
        }
    
    
    
        setUnreadCount(count);
    
    
    
        setRemovedProducts(
            removedData || []
        );
    
    }

    const runMonitor = async () => {

        console.log("Product monitor started");
      
      };


    const getStatusClass = (status:string)=>{

        if(status === "success"){
          return "status-success";
        }
      
        if(status === "error"){
          return "status-error";
        }
      
        return "status-pending";
      
      };

    return (

        <div className="product-monitor">
        
        
            <div className="monitor-header">
        
                <div>
        
                <h1>
 Product Monitor

 {unreadCount > 0 && (
   <span className="unread-badge">
     {unreadCount}
   </span>
 )}

</h1>

                    {
lastRun && (

<p>
Last manual check:
{lastRun}
</p>

)
}
        
                    <p>
                        Track product availability, removals and marketplace issues
                    </p>
        
                </div>
        
        
                <div>


<button
className="refresh-monitor"
onClick={loadMonitor}
>
🔄 Refresh
</button>



<button
className="run-monitor"
onClick={runMonitor}
disabled={running}
>

{
running
?
"⏳ Checking..."
:
"▶ Run Monitor"
}

</button>


</div>
        
            </div>
        
        
        
            <div className="monitor-stats">
        
        
                <div className="monitor-card">
        
                    <h3>
                        Removed
                    </h3>
        
                    <strong>
                        {removedProducts.length}
                    </strong>
        
                </div>
        
        
        
                <div className="monitor-card">
        
                    <h3>
                        Notifications
                    </h3>
        
                    <strong>
                        {notifications.length}
                    </strong>
        
                </div>
        
        
        
                <div className="monitor-card">
        
                    <h3>
                        Checks
                    </h3>
        
                    <strong>
                        {logs.length}
                    </strong>
        
                </div>
        
        
            </div>
        
        
        
        
            <section>
        
                <h3>
                    ❌ Removed Products
                </h3>
        
        
                {
                removedProducts.length === 0 ?
        
                (
                    <div className="empty-box">
                        No removed products
                    </div>
                )
        
                :
        
                removedProducts.map((product)=>(
        
                    <div
                    key={product.id}
                    className="removed-product">
        
        
                        <strong>
                            {product.title}
                        </strong>
        
        
                        <span>
                            Marketplace:
                            {product.marketplace}
                        </span>
        
        
                    </div>
        
                ))
        
                }
        
        
            </section>
        
        
        
        
            <section>
        
                <h3>
                    🔔 Notifications
                </h3>
        
        
                {
                notifications.map((item)=>(
        
                    <div
                    key={item.id}
                    className="notification-card">
        
        
                        <strong>
                            {item.products?.title}
                        </strong>
        
        
                        <p>
                            {item.message}
                        </p>
        
        
                    </div>
        
                ))
        
                }
        
        
            </section>
        
        
        
        
        
            <section>
        
                <h3>
                    📋 Recent Checks
                </h3>
        
        
                {
                logs.map((log)=>(
        
                    <div
                    key={log.id}
                    className="check-card">
        
        
                        <strong>
                            {log.products?.title}
                        </strong>
        
        
                        <span>
                            Status:
                            <b
className={getStatusClass(log.status)}
>
{log.status}
</b>
                        </span>
        
        
                        <span>
                            {log.error || "No errors"}
                        </span>
        
        
                        <small>
                        {
                        new Date(
                            log.checked_at
                        )
                        .toLocaleString()
                        }
                        </small>
        
        
                    </div>
        
                ))
        
                }
        
        
            </section>
        
        
        
        </div>
        
        );
            }