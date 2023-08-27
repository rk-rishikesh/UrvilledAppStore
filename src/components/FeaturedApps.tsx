import FeaturedItems from "./FeaturedItems";

import { featuredNFT, featuredDeFi, featuredGame, featuredSocial } from '../data/data'

function FeaturedApps() {

  return (
    <>
      <main className="flex flex-col gap-16 relative">
      <div className='sm:mt-32 relative opacity-100 z-20 grid items-center justify-items-center'>
                    <div className='grid items-center justify-items-center mt-28 md:mt-24'>
                    <FeaturedItems {...featuredNFT} />
                    <FeaturedItems {...featuredDeFi} />
                    <FeaturedItems {...featuredSocial} />
                    <FeaturedItems {...featuredGame} />
                    </div>

                </div>
       
      </main>
    </>
  );
}

export default FeaturedApps;
