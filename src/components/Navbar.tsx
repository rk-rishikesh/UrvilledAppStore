import logo from '../assets/logo.png'
import { useState, useEffect, useRef } from 'react'
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/store'
import { selectGetTotalQuantity, setOpenCart } from '../redux/CartSlice'
import "@Biconomy/web3-auth/dist/src/style.css"
import SocialLogin from "@biconomy/web3-auth"
import { ChainId } from "@biconomy/core-types";
import { ethers } from 'ethers'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { IPaymaster, BiconomyPaymaster, } from '@biconomy/paymaster'

const Navbar = () => {
  const [navState, setNavState] = useState(false)
  const dispatch = useAppDispatch()
  const quantityItems = useAppSelector(selectGetTotalQuantity)

  const [smartAccount, setSmartAccount] = useState<any>(null)
  const [interval, enableInterval] = useState(false)
  const sdkRef = useRef<SocialLogin | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [provider, setProvider] = useState<any>(null);

  const bundler: IBundler = new Bundler({
    bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })

  const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: 'https://paymaster.biconomy.io/api/v1/80001/jzpBK8IPc.54209f10-97d3-4469-9295-3ab4e5cf8ff0'
  })

  const onCartToggle = () => {
    dispatch(setOpenCart({
      cartState: true
    }))
  }

  const onNavScrool = () => {
    if (window.scrollY > 30) {
      setNavState(false)
    } else {
      setNavState(false)
    }
  }

  useEffect(() => {
    let configureLogin: any
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount()
          clearInterval(configureLogin)
        }
      }, 1000)
    }
  }, [interval])

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
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return
    sdkRef.current.hideWallet()
    setLoading(true)
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    )
    setProvider(web3Provider)

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
      console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
      console.log("deployed: ", await biconomySmartAccount.isAccountDeployed(await biconomySmartAccount.getSmartAccountAddress()))

      setSmartAccount(biconomySmartAccount)
      setLoading(false)
    } catch (err) {
      console.log('error setting up smart account... ', err)
    }
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

  return (
    <>
      <header className={!navState ? 'absolute top-7 left-0 right-0 opacity-100 z-50'
        : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'}>
        <nav className='flex items-center justify-between the-container'>
          <div className='flex items-center sm:mr-4'>
            <NavLink to="/">
              <img src={logo} alt="logo/img" className={`w-24 h-auto ${navState && "filter brightness-0"} `} />
            </NavLink>

          </div>
          <ul className='flex items-center justify-center gap-2'>
            <div className="flex mr-4 items-center justify-center">
              <div className="flex rounded-full border-2 border-violet-300">
                <input type="text" className="bg-inherit focus:outline-0 ml-4 px-4 py-2 w-56 sm:w-24 sm:px-2 sm:py-1" placeholder="Games, NFTs & more..." />
                <button className="px-4 text-white bg-violet-300 border-l rounded-full">
                  <img className="w-[25px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png" />
                </button>
              </div>
            </div>

            <li className='grid items-center '>
              <button type='button' onClick={onCartToggle}
                className='border-none outline-none
                            active:scale-110 transition-all duration-300 relative'>
                <img className="w-[40px]" src="https://icones.pro/wp-content/uploads/2022/02/icone-de-cloche-violette.png" />
                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight
                                font-medium rounded-full flex items-center justify-center
                                cursor-pointer hover:scale-110 transition-all duration-300 ${navState ?
                    "bg-slate-900 text-slate-100 shadow-slate-900" :
                    "bg-slate-100 text-slate-900 shadow-slate-100"}`}>{quantityItems}</div>
              </button>

            </li>
            {
              !smartAccount && !loading && <button onClick={login}>
                <button type='button'
                  className='border-none outline-none
                            active:scale-110 transition-all duration-300 relative'>
                  <img className="mt-2 ml-4 w-[38px]" src="https://cdn-icons-png.flaticon.com/512/5509/5509636.png" />
                </button>
              </button>
            }
            {
              loading && <img className="mt-2 ml-4  w-[38px]" src="https://i.gifer.com/ZZ5H.gif" />
            }
            {
        !!smartAccount && (
          <div className="buttonWrapper">
            <NavLink to="/profile">
            <button type='button'
                  className='border-none outline-none
                            active:scale-110 transition-all duration-300 relative'>
                  <img className="mt-2 ml-4 w-[38px]" src="https://cdn-icons-png.flaticon.com/512/666/666201.png" />
                </button>
           
            </NavLink>
            {/* <button onClick={logout}>Logout</button> */}
          </div>
        )
      }

          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar