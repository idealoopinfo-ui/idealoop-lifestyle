import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./NoticePanel.css";


export default function NoticePanel() {

  const [notices, setNotices] = useState<string[]>([]);
  const [index, setIndex] = useState(0);


  useEffect(() => {

    fetchNotices();

  }, []);
  async function fetchNotices() {
    const { data, error } = await supabase
      .from("notice_panels")
      .select("*");
  
    console.log("Notice rows:", data);
    console.log("Notice error:", error);
  
    if (error) return;
  
    setNotices(data?.map(item => item.message) ?? []);
  }
  useEffect(()=>{

    if(notices.length === 0) return;


    const timer = setInterval(()=>{

      setIndex(prev => 
        (prev + 1) % notices.length
      );

    },4000);

    return ()=>clearInterval(timer);

  },[notices]);
  if(notices.length === 0){
    return null;
  }
  return (

    <div className="notice-panel">

      <div className="notice-content">
        {notices[index]}
      </div>
    </div>

  );
}