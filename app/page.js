"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ActivityContainer from "./components/ActivityContainer";
import StampContainer from "./components/StampContainer";

export default function Home() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  return (
    <>
      <div>Client render forever: {user?.email}</div>
      {user && (
        <>
          <div className="grid grid-cols-3 gap-4">
            {/* Your grid items go here */}
            <div className="bg-gray-300 p-4">
              <ActivityContainer />
            </div>
            <div className="bg-gray-300 p-4">
              <StampContainer />
            </div>
            <div className="bg-gray-300 p-4">
              <>Intervals</>
            </div>
          </div>
        </>
      )}
    </>
  );
}
