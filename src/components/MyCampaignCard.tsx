import { client } from "@/app/client";
import Link from "next/link";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useReadContract, useActiveAccount } from "thirdweb/react";

type MyCampaignCardProps = {
  contractAddress: string;
};

export const MyCampaignCard: React.FC<MyCampaignCardProps> = ({ contractAddress }) => {
  const account = useActiveAccount();

  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: contractAddress,
  });

  const {
    data: name,
    isLoading: nameLoading,
    error: nameError,
  } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const {
    data: description,
    isLoading: descLoading,
    error: descError,
  } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  if (nameLoading || descLoading) {
    return (
      <div className="w-full max-w-md p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow animate-pulse">
        <div className="mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mt-6" />
      </div>
    );
  }

  if (nameError || descError) {
    return (
      <div className="w-full max-w-md p-6 bg-white dark:bg-slate-800 border border-red-200 rounded-2xl shadow">
        <h3 className="text-xl font-bold text-red-600 mb-2">Error</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">Failed to load campaign details.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/campaign/${contractAddress}`} passHref>
          <p className="inline-flex items-center justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
    </div>
  );
};
