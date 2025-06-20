import { client } from "../app/client";
import Link from "next/link";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { useState } from "react";

type CampaignCardProps = {
  campaignAddress: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaignAddress }) => {
  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: campaignAddress,
  });

  const { data: campaignName } = useReadContract({
    contract: contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: campaignDescription } = useReadContract({
    contract: contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: goal } = useReadContract({
    contract: contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  // Total funded balance of the campaign
  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    contract: contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const { data: endTime, isLoading: isLoadingEndTime, error: endTimeError } = useReadContract({
    contract: contract,
    method: "function endTime() view returns (uint256)",
    params: [],
  });

  // Calulate the total funded balance percentage
  const totalBalance = balance ? Number(balance.toString()) : 0;
  const totalGoal = goal ? Number(goal.toString()) : 0;
  let balancePercentage = totalGoal > 0 ? (totalBalance / totalGoal) * 100 : 0;

  // If balance is greater than or equal to goal, percentage should be 100
  if (balancePercentage >= 100) {
    balancePercentage = 100;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!isLoadingEndTime && !endTimeError && endTime && Number(endTime) < now) return null;

  if (
    isNaN(balancePercentage) ||
    !isFinite(balancePercentage) ||
    goal === undefined ||
    balance === undefined
  ) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl max-w-md w-full p-6 flex flex-col justify-between">
      {/* Progress Bar */}
      {!isLoadingBalance && (
        <div className="mb-4">
          <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
            <div
              className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right transition-all duration-500"
              style={{
                width: `${balancePercentage}%`,
                minWidth: balancePercentage > 0 ? "2rem" : 0,
              }}
            >
              <span className="text-white dark:text-white text-xs p-1">
                ${totalBalance} / ${totalGoal}
              </span>
            </div>
            {balancePercentage < 100 && (
              <span className="absolute top-0 right-2 text-blue-700 dark:text-blue-200 text-xs p-1">
                {balancePercentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Title & Description */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{campaignName}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{campaignDescription}</p>

      {/* View Campaign Button */}
      <Link href={`/campaign/${campaignAddress}`} passHref>
        <p className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Campaign
          <svg
            className="w-4 h-4 ml-2 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </p>
      </Link>
    </div>
  );
};
