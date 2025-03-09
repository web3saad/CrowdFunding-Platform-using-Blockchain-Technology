CrowdFunding Platform using Blockchain Technology

EtherFund is a decentralized crowdfunding platform built on Ethereum. It enables users to create and contribute to fundraising campaigns securely using blockchain technology. With the power of smart contracts, EtherFund ensures transparent and trustless transactions, eliminating intermediaries and reducing transaction fees.

🚀 Features

Decentralized Campaigns – Fundraisers can create campaigns with a title, description, and funding goal.

Secure Transactions – Contributions are made directly via Ethereum wallets.

Full Transparency – All transactions are recorded on the blockchain, ensuring authenticity.

MetaMask Integration – Users can connect their MetaMask wallets to interact with the platform.

Smart Contracts – Ensures trustless and automated fund management.

Public Dashboard – View and track all active campaigns in real-time.


📦 Installation & Setup

Clone the Repository:

git clone https://github.com/web3saad/EtherFund.git
cd EtherFund

Install Dependencies:

npm install

Set Up Environment Variables:
Create a .env file in the root directory and add the required environment variables:

NEXT_PUBLIC_TEMPLATE_CLIENT_ID="your_client_id_here"

Run the Development Server:

npm run dev

The project should now be running on http://localhost:3000/.

🔗 Smart Contract Deployment

EtherFund uses Solidity smart contracts deployed on the Ethereum blockchain. To deploy your own smart contracts using Thirdweb:

Login to Thirdweb Dashboard:

Go to Thirdweb

Connect your wallet and create a new contract project.

Deploy the Smart Contract:

Use the Thirdweb dashboard to deploy your contract to the Sepolia network.

Copy the deployed contract address.

Update Contract Address:
After deployment, update the contract address in the frontend configuration.

⚡ Usage Guide

Connect MetaMask Wallet – Users must connect their MetaMask wallets to interact with the platform.

Create a Fundraising Campaign – Fundraisers can set up campaigns with details and a funding goal.

Donate to a Campaign – Donors can contribute by sending Ethereum directly via the smart contract.

Withdraw Funds – Campaign owners can withdraw funds once their goal is reached.

🛡 Security & Considerations

Smart Contract Security: The contract is designed to prevent unauthorized withdrawals.

Preventing Scams: Future improvements will include validation mechanisms to verify campaign authenticity.

Gas Fees: Transactions require gas fees, which depend on Ethereum network conditions.



📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

📞 Contact

Developer: Mahammad Sayad

GitHub: web3saad

Twitter: @w3chad
