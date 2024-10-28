import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const TopHeader = () => {
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup", "/verify", "/interests"].includes(
    pathname
  );

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const userData = JSON.parse(userInfo);
        setUserName(userData.name);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex items-end justify-end space-x-2 text-sm bg-white md:flex gap-2 my-2">
      <Link href="/help" className="hover:text-primary">
        Help
      </Link>
      {/* <span>|</span> */}
      <Link href="/orders" className="hover:text-primary">
        Orders & Returns
      </Link>
      {/* <span>|</span> */}
      {/* {!isAuthPage && ( */}

      {userName ? (
        <Link href="/profile" className="hover:text-primary">
          Hi, {userName}
        </Link>
      ) : (
        <Link href="/profile" className="hover:text-primary">
          Hi, John
        </Link>
      )}

      {/* )} */}
    </div>
  );
};

export default TopHeader;
