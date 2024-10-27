import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TopHeader = () => {
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup", "/verify", "/interests"].includes(
    pathname
  );

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
      {!isAuthPage && (
        <Link href="/profile" className="hover:text-primary">
          Hi, John
        </Link>
      )}
    </div>
  );
};

export default TopHeader;
