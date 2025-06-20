'use client';
import { client } from "@/app/client";
import { TierCard } from "@/components/TierCard";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { lightTheme, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";

export default function CampaignPage() {
  const account = useActiveAccount();
  const { campaignAddress } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contract = getContract({
    client,
    chain: baseSepolia,
    address: campaignAddress as string,
  });

  const { data: name, isLoading: isLoadingName } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: description } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const { data: goal, isLoading: isLoadingGoal } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const { data: tiers, isLoading: isLoadingTiers } = useReadContract({
    contract,
    method: "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
    params: [],
  });

  const { data: owner } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const { data: status } = useReadContract({
    contract,
    method: "function state() view returns (uint8)",
    params: [],
  });

  const deadlineDate = new Date(parseInt(deadline?.toString() || "0") * 1000);
  const totalBalance = parseInt(balance?.toString() || "0");
  const totalGoal = parseInt(goal?.toString() || "1");
  let balancePercentage = (totalBalance / totalGoal) * 100;
  if (balancePercentage >= 100) balancePercentage = 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {!isLoadingName && (
          <div className="w-full flex justify-center">
            <h1 className="text-3xl font-extrabold text-center uppercase text-blue-900 dark:text-blue-400 tracking-wide">{name}</h1>
          </div>
        )}
        {owner === account?.address && (
          <div className="flex items-center gap-3">
            {isEditing && (
              <span className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md">
                Status: {status === 0 ? "Active" : status === 1 ? "Successful" : "Failed"}
              </span>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
            >
              {isEditing ? "Done" : "Edit"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Deadline</p>
          {!isLoadingDeadline && (
            <p className="text-gray-700 dark:text-gray-300">{deadlineDate.toDateString()}</p>
          )}
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Funding Progress</p>
          {!isLoadingBalance && (
            <>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-6 rounded-full relative overflow-hidden mt-2">
                <div
                  className="h-full bg-green-500 text-white text-xs font-medium flex items-center justify-end rounded-full transition-all duration-500"
                  style={{ width: `${balancePercentage}%` }}
                >
                  <span className="pr-2">{balancePercentage.toFixed(0)}%</span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Raised: ${balance?.toString()}</span>
                <span>Goal: ${goal?.toString()}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold text-center uppercase text-blue-900 dark:text-blue-400 mb-4 tracking-wide">Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoadingTiers ? (
            <div className="flex justify-center items-center col-span-full py-8">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          ) : tiers && tiers.length > 0 ? (
            tiers.map((tier, index) => (
              <TierCard
                key={index}
                tier={tier}
                index={index}
                contract={contract}
                isEditing={isEditing}
              />
            ))
          ) : (
            !isEditing && <p className="text-gray-500">No tiers available</p>
          )}

          {isEditing && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col justify-center items-center p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
            >
              + Add Tier
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CreateCampaignModal setIsModalOpen={setIsModalOpen} contract={contract} />
      )}
    </div>
  );
}

// Modal Component
type CreateTierModalProps = {
  setIsModalOpen: (value: boolean) => void;
  contract: ThirdwebContract;
};

const CreateCampaignModal = ({ setIsModalOpen, contract }: CreateTierModalProps) => {
  const [tierName, setTierName] = useState<string>("");
  const [tierAmount, setTierAmount] = useState<bigint>(1n);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create a Funding Tier</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-sm px-3 py-1 bg-gray-700 text-white rounded-md"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tier Name</label>
            <input
              type="text"
              value={tierName}
              onChange={(e) => setTierName(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
              placeholder="Tier Name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tier Amount</label>
            <input
              type="number"
              value={parseInt(tierAmount.toString())}
              onChange={(e) => setTierAmount(BigInt(e.target.value))}
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract,
                method: "function addTier(string _name, uint256 _amount)",
                params: [tierName, tierAmount],
              })
            }
            onTransactionConfirmed={() => {
              alert("Tier added successfully!");
              setIsModalOpen(false);
            }}
            onError={(error) => alert(`Error: ${error.message}`)}
            theme={lightTheme()}
          >
            Add Tier
          </TransactionButton>
        </div>
      </div>
    </div>
  );
};
