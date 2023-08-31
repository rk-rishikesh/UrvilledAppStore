import { useState, useEffect, useRef } from 'react'
import { Tooltip } from "@material-tailwind/react";
import "@Biconomy/web3-auth/dist/src/style.css"
import SocialLogin from "@biconomy/web3-auth"
import { ChainId } from "@biconomy/core-types";
import { BigNumber, ethers } from 'ethers'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { IPaymaster, BiconomyPaymaster, } from '@biconomy/paymaster'
import { IHybridPaymaster, SponsorUserOperationDto, PaymasterMode, } from '@biconomy/paymaster'
import { TOKENABI, TOKENADDRESS } from "../contracts/UrvilleAccountToken";
import { REGISTRYADDRESS, REGISTRYABI } from "../contracts/UrvilleAccountRegistry";

export default function Profile() {

    const [smartAccount, setSmartAccount] = useState<any>(null)
    const [interval, enableInterval] = useState(false)
    const sdkRef = useRef<SocialLogin | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [provider, setProvider] = useState<any>(null);
    const [tokenID, setTokenID] = useState<any>(null);
    const [urvilleAccount, setUrvilleAccount] = useState<any>(null);
    const [newUser, setNewUser] = useState<boolean>(false);
    const [box, setOpenBox] = useState<boolean>(true);

    const bundler: IBundler = new Bundler({
        bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',
        chainId: ChainId.POLYGON_MUMBAI,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    })

    const paymaster: IPaymaster = new BiconomyPaymaster({
        paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/jzpBK8IPc.54209f10-97d3-4469-9295-3ab4e5cf8ff0'
    })

    useEffect(() => {
        const init = async () => {
            await login()
            // await setupSmartAccount()
        };

        init();
    }, []);

    async function login() {
        if (!sdkRef.current) {
            const socialLoginSDK = new SocialLogin();
            const signature1 = await socialLoginSDK.whitelistUrl(
                "http://127.0.0.1:5173/"
            );
            await socialLoginSDK.init({
                chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
                network: "testnet",
                whitelistUrls: {
                    "http://127.0.0.1:5173/": signature1,
                },
            });
            sdkRef.current = socialLoginSDK;
        }
        if (!sdkRef.current.provider) {
            sdkRef.current.showWallet();
            enableInterval(true);
        } else {
            await setupSmartAccount();
        }
    }

    async function setupSmartAccount() {
        console.log("hello")
        if (!sdkRef?.current?.provider) return
        sdkRef.current.hideWallet()
        setLoading(true)
        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )
        setProvider(web3Provider)
        console.log(web3Provider)

        try {
            const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
                signer: web3Provider.getSigner(),
                chainId: ChainId.POLYGON_MUMBAI,
                bundler: bundler,
                paymaster: paymaster
            }
            let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
            biconomySmartAccount = await biconomySmartAccount.init()
            console.log("owner: ", biconomySmartAccount.owner)
            const address = await biconomySmartAccount.getSmartAccountAddress()
            console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
            console.log("deployed: ", await biconomySmartAccount.isAccountDeployed(await biconomySmartAccount.getSmartAccountAddress()))

            setSmartAccount(biconomySmartAccount)
            console.log(address)
            await getBalance(address)
            setLoading(false)
        } catch (err) {
            console.log('error setting up smart account... ', err)
        }
    }

    const getBalance = async (address: any) => {

        if (!sdkRef?.current?.provider) return
        sdkRef.current.hideWallet()

        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )
        const contract = new ethers.Contract(TOKENADDRESS, TOKENABI, web3Provider);
        console.log("Fetching Balance of : ", address)
        const currentBalance = await contract.balanceOf(address);

        if (currentBalance == 0) {
            console.log("New User Found! ")
            setNewUser(true)
            const id = await mintToken();
            console.log(id)
            await getUrvilleWalletAddress(id)
        } else {
            console.log("Old User Found !")
            const id = await getUserTokenID(address);
            await getUrvilleWalletAddress(id)
        }
    }

    const mintToken = async () => {
        try {

            const mintToken = new ethers.utils.Interface(["function mintUrvilleAccountToken()"]);
            const data = mintToken.encodeFunctionData("mintUrvilleAccountToken");

            const tx1 = {
                to: TOKENADDRESS,
                data: data,
            };

            let partialUserOp = await smartAccount.buildUserOp([tx1]);

            const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

            let paymasterServiceData: SponsorUserOperationDto = {
                mode: PaymasterMode.SPONSORED,
                // optional params...
            };

            try {
                console.log("Minting Account Token")
                const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
                partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

                const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
                const transactionDetails = await userOpResponse.wait();

                console.log("Transaction Details:", transactionDetails);
                console.log("Transaction Hash:", userOpResponse.userOpHash);
                const contract = new ethers.Contract(TOKENADDRESS, TOKENABI, provider);
                const totalSupply = await contract.totalSupply();
                setTokenID(totalSupply);
                return totalSupply;

            } catch (e) {
                console.error("Error executing transaction:", e);
                // ... handle the error if needed ...
            }
        } catch (error) {
            console.error("Error executing transaction:", error);
        }
    };

    const getUserTokenID = async (address: any) => {
        console.log("Fetching User Token ID")
        if (!sdkRef?.current?.provider) return
        sdkRef.current.hideWallet()

        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )

        const contract = new ethers.Contract(TOKENADDRESS, TOKENABI, web3Provider);
        var totalSupply = await contract.totalSupply();
        totalSupply = Number(totalSupply._hex);
        console.log(totalSupply)
        var id = 0;

        for (var i = 0; i < totalSupply; i++) {
            console.log(i)
            const owner = await contract.ownerOf(i);
            console.log(owner)
            console.log(address)
            if (owner.toString().toUpperCase() === address.toString().toUpperCase()) {
                setTokenID(i);
                id = i;
            }
        }
        return id
    }

    const createUrvilleAccount = async () => {
        try {

            const implementation = "0x8088d32492bde496Adb942D8aFD2016EFFd24F9D"
            const chainId = 80001
            const salt = 0
            const mintToken = new ethers.utils.Interface(REGISTRYABI);
            const data = mintToken.encodeFunctionData("createAccount", [implementation, chainId, TOKENADDRESS, tokenID, salt, []]);

            const tx1 = {
                to: REGISTRYADDRESS,
                data: data,
            };

            let partialUserOp = await smartAccount.buildUserOp([tx1]);

            const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

            let paymasterServiceData: SponsorUserOperationDto = {
                mode: PaymasterMode.SPONSORED,
                // optional params...
            };

            try {
                console.log("Minting Account Token")
                const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, paymasterServiceData);
                partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

                const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
                const transactionDetails = await userOpResponse.wait();

                console.log("Transaction Details:", transactionDetails);
                console.log("Transaction Hash:", userOpResponse.userOpHash);
                const contract = new ethers.Contract(TOKENADDRESS, TOKENABI, provider);
                const totalSupply = await contract.totalSupply();
                setTokenID(totalSupply);

            } catch (e) {
                console.error("Error executing transaction:", e);
                // ... handle the error if needed ...
            }
        } catch (error) {
            console.error("Error executing transaction:", error);
        }
    };

    const getUrvilleWalletAddress = async (tokenId: any) => {
        if (!sdkRef?.current?.provider) return
        sdkRef.current.hideWallet()

        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )

        const contract = new ethers.Contract(REGISTRYADDRESS, REGISTRYABI, web3Provider);
        const implementation = "0x8088d32492bde496Adb942D8aFD2016EFFd24F9D"
        const chainId = 80001
        const salt = 0
        console.log(tokenId)
        var urvilleAcc = await contract.account(implementation, chainId, TOKENADDRESS, tokenId, salt)
        console.log("URVILLE ACCOUNT", urvilleAcc)
        setUrvilleAccount(urvilleAcc)
    }

    const logout = async () => {
        if (!sdkRef.current) {
            console.error('Web3Modal not initialized.')
            return
        }
        await sdkRef.current.logout()
        sdkRef.current.hideWallet()
        setSmartAccount(null)
        enableInterval(false)
    }

    const openLootBox = async () => {
        setLoading(true)
        await new Promise((r) => setTimeout(r, 5000));
        setLoading(false)
        setOpenBox(false)
    }

    return (
        <>
            <main className="profile-page">
                <section className="relative block" style={{ height: "400px" }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://insidetelecom.com/wp-content/uploads/2022/09/Metaverse-App.jpg')"
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>

                </section>
                <section className="relative py-16">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src="https://i.pinimg.com/originals/4e/9e/1f/4e9e1f5a41b738e3066d135da871a46c.gif"
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                style={{ maxWidth: "150px" }}
                                            />

                                        </div>

                                    </div>

                                    {!smartAccount && <> <div className='sm:mt-4 flex items-center justify-center max-w-xl relative lg:max-w-none w-full'>
                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/metaverse-world-6618595-5552783.png"
                                            className='mt-32 w-auto object-fill transitions-theme
                                                            h-80 lg:h-56 md-h-52 sm:h-48 xsm:h-36 -rotate-[10deg] hover:rotate-12'

                                        />
                                    </div></>}
                                    {loading ? <> <img className='mt-32 w-16 mb-32' src="https://i.gifer.com/ZZ5H.gif" /></> : <>

                                        {smartAccount && <a className="flex items-center" target={"_blank"} role="button">
                                            <button type='button' className='mt-32 button-theme bg-slate-900 shadow-slate-900
                                                text-slate-100 py-1.5' onClick={() => logout()}>Logout Account</button>
                                        </a>}

                                        <div className="mt-32">
                                        </div>

                                        {!newUser ? <></> : <div className='flex items-center justify-between lg:flex-col
                                                    lg:justify-center the-container flex-row-reverse'>
                                            <div className='max-w-lg lg:max-w-none w-full md:text-center grid items-center
                                                        lg:justify-items-center'>
                                                <h1 className='text-4xl sm:text-3xl  font-bold text-gradient'>Welcome</h1>
                                                <h1 className='text-5xl lg:text-4xl md:text-3xl
                                                            sm:text-2xl font-bold text-slate-900 filter
                                                            drop-shadow-lg'>Let's Get Started</h1>
                                                <p className='xl:text-sm my-4 text-slate-900'>Unlock your special welcome gift now and kickstart your journey with us in style!</p>
                                                <a className="flex items-center" target={"_blank"} role="button">

                                                    <button type='button' className='button-theme bg-slate-900 shadow-slate-900
                                                    text-slate-100 py-1.5' onClick={() => createUrvilleAccount()}>Claim 100 URV Tokens 💰</button>


                                                </a>
                                            </div>
                                            <div className='sm:mt-4 flex items-center justify-center max-w-xl relative lg:max-w-none w-full'>
                                                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/metaverse-world-6618595-5552783.png"
                                                    className='w-auto object-fill transitions-theme
                                                            h-80 lg:h-56 md-h-52 sm:h-48 xsm:h-36 -rotate-[10deg] hover:rotate-12'

                                                />
                                            </div>
                                        </div>}

                                        {smartAccount &&
                                            <>
                                                {/* ERC4337 */}
                                                <div className='flex items-center justify-between lg:flex-col
                                                    lg:justify-center the-container flex-row-reverse'>
                                                    <div className='max-w-lg lg:max-w-none w-full md:text-center grid items-center
                                                        lg:justify-items-center'>
                                                        <h1 className='text-4xl sm:text-3xl  font-bold text-gradient'>ERC 4771 Wallet</h1>
                                                        {/* <h1 className='text-5xl lg:text-4xl md:text-3xl
                                                            sm:text-2xl font-bold text-slate-900 filter
                                                            drop-shadow-lg'>It's Your Urville Wallet</h1> */}
                                                        <p className='xl:text-sm my-4 text-slate-900'>{smartAccount.address}</p>

                                                        <div className='flex'>
                                                            <div className="mr-16 p-3 text-center mt-8">
                                                                <span className="text-xl block tracking-wide text-gray-700">
                                                                {box ? "100 URV" : "30 URV"}
                                                                </span>
                                                                <span className="text-sm text-gray-500">URV Balance</span>
                                                            </div>
                                                            <div className="ml-4 p-3 text-center mt-8">
                                                                <span className="text-xl block  tracking-wide text-gray-700">
                                                                    0 MATIC
                                                                </span>
                                                                <span className="text-sm text-gray-500">MATIC BALANCE</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='sm:mt-4 flex items-center justify-center max-w-xl relative lg:max-w-none w-full'>
                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-playing-meta-game-6618538-5552793.png?f=webp"
                                                            className='w-auto object-fill transitions-theme
                                                            h-80 lg:h-56 md-h-52 sm:h-48 xsm:h-36 -rotate-[10deg] hover:rotate-12'

                                                        />
                                                    </div>
                                                </div>

                                                {/* ERC 6551 */}
                                                <div className='flex items-center justify-between lg:flex-col
                                                    lg:justify-center the-container flex-row'>
                                                    <div className='max-w-lg lg:max-w-none w-full md:text-center grid items-center
                                                        lg:justify-items-center'>
                                                        <h1 className='text-4xl sm:text-3xl  font-bold text-gradient'>ERC 6551 Wallet</h1>
                                                        {/* <h1 className='text-5xl lg:text-4xl md:text-3xl
                                                            sm:text-2xl font-bold text-slate-900 filter
                                                            drop-shadow-lg'>It's Your Urville Wallet</h1> */}
                                                        <p className='xl:text-sm my-4 text-slate-900'>{urvilleAccount}</p>

                                                        <div className='flex'>
                                                            <div className="mr-16 p-3 text-center mt-8">
                                                                <span className="text-xl block tracking-wide text-gray-700">
                                                                    {tokenID}
                                                                </span>
                                                                <span className="text-sm text-gray-500">TOKEN ID</span>
                                                            </div>
                                                            <div className="ml-4 p-3 text-center mt-8">
                                                                <span className="text-xl block  tracking-wide text-gray-700">
                                                                    {box ? "0 $" : "51.05$"}
                                                                </span>
                                                                <span className="text-sm text-gray-500">ACCOUNT VALUE</span>
                                                            </div>
                                                        </div>

                                                        {!box ? <div className='flex mb-8'>
                                                            <div className="p-3 item-center text-center mt-8">
                                                                <Tooltip content="Urville Level 1">
                                                                    <span className="text-xl block tracking-wide text-gray-700">
                                                                        <img className="w-16" src="https://cdn-icons-png.flaticon.com/512/1021/1021210.png" />
                                                                    </span>
                                                                </Tooltip>

                                                            </div>
                                                            <div className="ml-4 p-3 text-center mt-8">
                                                                <Tooltip content="Premium Notification Subscription">
                                                                    <span className="text-xl block tracking-wide text-gray-700">
                                                                        <img className="w-16" src="https://img.freepik.com/premium-photo/premium-game-button-notification-icon-3d-rendering-isolated-background_150525-2942.jpg" />
                                                                    </span>
                                                                </Tooltip>
                                                            </div>
                                                            <div className="ml-4 p-3 text-center mt-8">
                                                                <Tooltip content="Lens Handle">
                                                                    <span className="text-xl block tracking-wide text-gray-700">
                                                                        <img className="mt-2 w-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ60fbKiidqdTlUPCGR4M9cDIhb_UW2E4xUFFh2uzB2YFq5nYkok3KSN4a5178RQuw4DJY&usqp=CAU" />
                                                                    </span>
                                                                </Tooltip>
                                                            </div>

                                                        </div> : <></>}

                                                    </div>
                                                    <div className='sm:mt-4 flex items-center justify-center max-w-xl relative lg:max-w-none w-full'>
                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-smartphone-using-metaverse-6618799-5552767.png?f=webp"
                                                            className='w-auto object-fill transitions-theme
                                                            h-80 lg:h-56 md-h-52 sm:h-48 xsm:h-36 -rotate-[10deg] hover:rotate-12'

                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        {box && <>
                                            {!newUser && smartAccount && <div className="bg-white">
                                                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                                                    <div className="rounded-xl relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                                                        <svg
                                                            viewBox="0 0 1024 1024"
                                                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                                                            aria-hidden="true"
                                                        >
                                                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                                                            <defs>
                                                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                                                    <stop stopColor="#7775D6" />
                                                                    <stop offset={1} stopColor="#E935C1" />
                                                                </radialGradient>
                                                            </defs>
                                                        </svg>

                                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                                <div className="mr-4 p-3 text-center -mt-24">
                                                                    <img src="https://miro.medium.com/v2/resize:fit:946/1*C8vjYe9EvpJb8dI2FFLMNQ.gif" />
                                                                </div>


                                                                <div className="mr-4 p-3 text-center">
                                                                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                                                                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                                                            Unlock a World of Surprises with Lootbox Adventures
                                                                            <br />

                                                                        </h2>
                                                                        <p className="mt-6 text-lg leading-8 text-gray-300">
                                                                            Dive into the thrilling world of Lootbox Adventures and unlock a treasure chest of rewards while earning valuable URV tokens and in app NFTs.
                                                                        </p>
                                                                        <p className="mt-6 text-lg leading-8 text-gray-300">
                                                                            You can unlock 1 lootbox every week
                                                                        </p>
                                                                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                                                            <button
                                                                                onClick={() => openLootBox()}
                                                                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                                                            >
                                                                                Open Lootbox For 70 URV
                                                                            </button>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>}
                                        </>}

                                    </>}


                                </div>



                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}