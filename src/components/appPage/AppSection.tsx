import { Text } from "./Text";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

const linkDownloadPolygonIDWalletApp =
    "https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/#quick-start";

function AppSection({ }) {

    const { appId } = useParams();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [logo, setAppLogo] = useState("");
    const [banner, setBanner] = useState("");
    const [scOne, setSCOne] = useState("");
    const [scTwo, setSCTwo] = useState("");
    const [scThree, setSCThree] = useState("");
    const [appURL, setAppURL] = useState("");
    const [rating, setRating] = useState("");
    const [age, setAge] = useState(0);
    const [visits, setVisit] = useState(0);
    const [chains, setChains] = useState([""])
    const [check, setChecked] = useState(false);
    const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);

    const publicServerURL =
        "http://localhost:8080"
    const localServerURL =
        "http://localhost:8080"

    const credentialType = "KYCAgeCredential"
    const issuerOrHowToLink =
        "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"


    // Polygon ID - Integration

    const [sessionId, setSessionId] = useState<any>("");
    const [qrCodeData, setQrCodeData] = useState<any>();
    const [qr, setShowQR] = useState<boolean>(false);
    const [isHandlingVerification, setIsHandlingVerification] = useState<any>(false);
    const [verificationCheckComplete, setVerificationCheckComplete] =
        useState<any>(false);
    const [verificationMessage, setVerfificationMessage] = useState<any>("");
    const [socketEvents, setSocketEvents] = useState<any>([]);

    // serverUrl is localServerURL if not running in prod
    // Note: the verification callback will always come from the publicServerURL
    const serverUrl = window.location.href.startsWith("https")
        ? publicServerURL
        : localServerURL;

    const getQrCodeApi = (sessionId: any) =>
        serverUrl + `/api/get-auth-qr?sessionId=${sessionId}`;

    const socket = io(serverUrl);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id)
            setSessionId(socket.id);

            // only watch this session's events
            socket.on(socket.id, (arg) => {
                setSocketEvents((socketEvents: any) => [...socketEvents, arg]);
            });
        });
    }, []);

    useEffect(() => {
        const fetchQrCode = async () => {
            const response = await fetch(getQrCodeApi(sessionId));
            const data = await response.text();
            return JSON.parse(data);
        };

        if (sessionId) {
            fetchQrCode().then(setQrCodeData).catch(console.error);

        }
    }, [sessionId]);

    // socket event side effects
    // const verifyAge = () => {
    //     console.log(socketEvents)
    //     if (socketEvents.length) {

    //         const currentSocketEvent = socketEvents[socketEvents.length - 1];

    //         if (currentSocketEvent.fn === "handleVerification") {
    //             if (currentSocketEvent.status === "IN_PROGRESS") {
    //                 console.log("In Progress")
    //                 setIsHandlingVerification(true);
    //             } else {
    //                 setIsHandlingVerification(false);
    //                 setVerificationCheckComplete(true);
    //                 if (currentSocketEvent.status === "DONE") {
    //                     console.log("Done")
    //                     setVerfificationMessage("✅ Verified proof");
    //                     setTimeout(() => {
    //                         reportVerificationResult(true);
    //                     }, 2000);

    //                     socket.close();
    //                 } else {
    //                     setVerfificationMessage("❌ Error verifying VC");
    //                 }
    //             }
    //         }
    //     }
    // };

    // socket event side effects
    useEffect(() => {
        if (socketEvents.length) {
            const currentSocketEvent = socketEvents[socketEvents.length - 1];

            if (currentSocketEvent.fn === "handleVerification") {
                if (currentSocketEvent.status === "IN_PROGRESS") {
                    setIsHandlingVerification(true);
                } else {
                    setIsHandlingVerification(false);
                    setVerificationCheckComplete(true);
                    if (currentSocketEvent.status === "DONE") {
                        setVerfificationMessage("https://static.vecteezy.com/system/resources/previews/010/915/900/original/3d-fingerprint-digital-security-authentication-concept-icon-or-3d-people-authorization-identity-icon-free-png.png");
                        setTimeout(() => {
                            reportVerificationResult(true);
                        }, 2000);

                        socket.close();
                    } else {
                        setVerfificationMessage("❌ Error verifying VC");
                    }
                }
            }
        }
    }, [socketEvents]);


    // callback, send verification result back to app
    const reportVerificationResult = (result: any) => {
        setProvedAccessBirthday(result);
        setShowQR(false)
    };

    function openInNewTab(url: any) {
        var win = window.open(url, "_blank");
        if (win != null) {
            win.focus();
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.meroku.store/api/v1/dapp/search/${appId}`);
            const data = await response.json();
            console.log(data)
            setName(data.data[0].name)
            setDesc(data.data[0].description)
            setAppLogo(data.data[0].images.logo)
            setBanner(data.data[0].images.banner)
            setSCOne(data.data[0].images.screenshots[0])
            setSCTwo(data.data[0].images.screenshots[1])
            setSCThree(data.data[0].images.screenshots[2])
            console.log(data.data[0].images.screenshots[0])
            setAppURL(data.data[0].appUrl);
            console.log(data.data[0].appUrl)
            setChains(data.data[0].chains);
            setVisit(data.data[0].metrics.visits);
            setAge(data.data[0].minAge);

            let chainArray = []
            for (var i = 0; i < data.data[0].chains.length; i++) {
                if (data.data[0].chains[i] == 1) {
                    chainArray.push("https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png")
                } else if (data.data[0].chains[i] == 137) {
                    chainArray.push("https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/DPYBKVZG55EWFHIK2TVT3HTH7Y.png")
                } else if (data.data[0].chains[i] = 42161) {
                    chainArray.push("https://assets-global.website-files.com/5f973c97cf5aea614f93a26c/646cf25d9c769e96d73b4b80_arbitrum-shield.png")
                }
            }
            setChains(chainArray)
        };

        fetchData();
    }, []);

    const parseLines = () => desc.replace(/(\\n)/g, " ");

    return (
        <>

            <div className={`mb-36 sm:mb-44 flex flex-wrap justify-between sm:flex-row lg:flex-col
        lg:justify-center the-container 'flex-row-reverse'`}>
                <div className='items-start relative sm:mt-32 absolute inset-y-0 right-0 max-w-lg lg:max-w-none w-full md:text-center'>
                    <div className="mt-32 sm:-mt-8 flex flex-col before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg z-10">
                        <Text as="h1" className="mb-4 text-justify text-base text-gray-700 md:-left-3 left-0 lg:text-4xl md:text-4xl text-4xl font-extrabold lg:-top-36 md:-top-20 -top-16 -z-10">
                            <div className="grid grid-row-2 ">
                                <div>
                                    <img onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                                    }}
                                        className="rounded-md mt-4 w-12 h-12" src={logo} />
                                </div>
                                <div className="mt-2">
                                    {name}
                                </div>

                            </div>
                        </Text>
                        <div className="flex flex-row gap-2">
                            <img onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                            }}
                                className="w-5 h-5" src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" />
                            <img onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                            }}
                                className="w-5 h-5" src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/DPYBKVZG55EWFHIK2TVT3HTH7Y.png" />
                        </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                    4 ⭐️
                                </span>
                                <span className="text-sm text-gray-500">Rating</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                    {age}+
                                </span>
                                <span className="text-sm text-gray-500">Age Limit</span>
                            </div>
                            <div className="lg:mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                    {visits}
                                </span>
                                <span className="text-sm text-gray-500">Visits</span>
                            </div>
                        </div>
                    </div>


                    <Text as="p" className="text-zinc-500 mt-5 mb-4 text-justify text-base">
                        {parseLines()}
                    </Text>


                    <div className="flex gap-2">
                        <div className="w-1/2">
                            {/* <a href={appURL} target="_blank"> */}


                            {
                                provedAccessBirthday ?
                                    <>
                                        <a href={appURL} target="_blank">
                                            <button type='button' className='w-full button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'>Visit dApp</button>
                                        </a>
                                    </> :
                                    <>
                                        <a target="_blank">
                                            {sessionId ? (
                                                <button type='button' onClick={() => { setShowQR(true) }} className='w-full button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'>Verfiy Age</button>
                                            ) : (
                                                "Loading"
                                            )}

                                        </a>
                                    </>
                            }
                        </div>
                        <div className="w-1/2">
                            <a href="/" target="_blank">
                                <button type='button' className='w-full button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'>Pin to wall</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='absolute mt-32 sm:mt-4 justify-center max-w-xl relative lg:max-w-none w-full'>

                    {qr ? <>
                        <div>
                            {isHandlingVerification && (
                                <div>
                                    <img className='mt-4 w-80 ml-32' src="https://blogs.sap.com/wp-content/uploads/2021/10/500-fingerprint-security-outline.gif" />
                                    <p className="ml-56">Authenticating</p>

                                </div>
                            )}
                            {<div>
                                    <img className='mt-4 w-80 ml-32' src={verificationMessage} />
                                    {verificationMessage && <p className="ml-56">Age Verified ✅</p>}

                                </div>}
                            {qrCodeData &&
                                !isHandlingVerification &&
                                !verificationCheckComplete && (
                                    <div className="mt-16 ml-40 justify-center">

                                        <QRCode value={JSON.stringify(qrCodeData)} />
                                    </div>
                                )}


                            {qrCodeData.body.message && <><p>{qrCodeData.body.message}</p></>}

                            {qrCodeData.body.reason && (
                                <p className="mt-4 ml-32 mb-4 ">Reason: {qrCodeData.body.reason}</p>
                            )}
                            <button

                                className='w-full button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'

                                onClick={() => openInNewTab(linkDownloadPolygonIDWalletApp)}
                            >
                                Download the Polygon ID Wallet App{" "}

                            </button>
                            <button

                                className='w-full mt-2 button-theme bg-slate-500 shadow-slate-900 text-slate-100 py-1.5'

                                onClick={() => openInNewTab(issuerOrHowToLink)}
                            >
                                Get a {credentialType}

                            </button>
                            {/* <button type='button' onClick={() => { verifyAge()}} className='w-full button-theme bg-slate-900 shadow-slate-900 text-slate-100 py-1.5'>Verfiy Proof</button> */}
                        </div>

                    </> :

                        <>
                            <div>
                                <img onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                                }}
                                    src={banner}
                                    className={`rounded-xl sm:w-full sm:h-full object-fill transitions-theme
                        'h-80 lg:h-56 md-h-52 sm:h-28 xsm:h-36'`}
                                />
                            </div>

                            <div className="flex sm:flex-wrap">
                                {
                                    scOne != "https://dgshe1iny46ip.cloudfront.net/screenshots.png" && <>
                                        {scOne != "undefined" &&
                                            <img onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                                            }}
                                                className="sm:relative rounded-xl px-1 mt-2 w-1/3 sm:w-1/3 h-100" src={scOne} />
                                        }
                                        {scTwo != "undefined" && <img
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                                            }}
                                            className="sm:relative rounded-xl px-1 mt-2 w-48 sm:w-1/3 h-100" src={scTwo} />}
                                        {scThree != "undefined" &&
                                            <img
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png";
                                                }}
                                                className="sm:relative rounded-xl px-1 mt-2 w-48 sm:w-1/3 h-100" src={scThree} />}
                                    </>
                                }

                            </div>
                        </>


                    }


                </div>

            </div>
        </>
    )
}

export default AppSection