import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const TopHeader = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = ["/signin", "/signup", "/verify", "/interests"].includes(
    pathname
  );

  const [userName, setUserName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
  }, [isAuthPage]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserName(null); // Clear the username from the state
    window.location.href = "/";
  };

  return (
    <div className="flex items-end justify-end space-x-2 text-sm bg-white md:flex gap-2 my-2 relative">
      <Link href="/help" className="hover:text-primary">
        Help
      </Link>
      <Link href="/orders" className="hover:text-primary">
        Orders & Returns
      </Link>

      {userName ? (
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="hover:text-primary cursor-pointer">
            Hi, {userName}
          </span>
          {showDropdown && (
            <div className="absolute top-3 right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
              <button
                className="block px-4 py-2 text-sm text-gray-700 flex gap-2 items-center hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                <ExitIcon />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/signin" className="hover:text-primary">
          Hi, John
        </Link>
      )}
    </div>
  );
};

export default TopHeader;
