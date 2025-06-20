'use client';
import { client } from "@/app/client";
import Link from "next/link";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";

const Navbar = () => {
  const account = useActiveAccount();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo + Nav Links */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={thirdwebIcon}
                alt="Thirdweb Logo"
                width={32}
                height={32}
                className="drop-shadow-[0_0_6px_#a726a9a8]"
              />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                EtherFund
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-6 ml-8">
              <Link href="/" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition font-medium">
                Campaigns
              </Link>
              {account && (
                <Link href={`/dashboard/${account.address}`} className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition font-medium">
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/post-campaign">
              <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow transition-all duration-200">
                Post Campaign
              </button>
            </Link>
            <ConnectButton
              client={client}
              theme={lightTheme({
                colors: {
                  primaryButtonBg: "#7c3aed",
                  primaryButtonText: "#ffffff",
                },
                borderRadius: "md",
              })}
              detailsButton={{
                style: {
                  maxHeight: "40px",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
