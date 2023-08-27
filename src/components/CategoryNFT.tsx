import CategoryFlexContent from "./CategoryFlexContent";
import Category from "./Category";
import { nft, nftCategory } from '../data/data'

function CategoryNFT() {

  return (
    <>
      <main className="flex flex-col gap-16 relative">
        <div className='relative opacity-100 z-20 grid items-center justify-items-center'>
          <div className='grid items-center justify-items-center mt-28 md:mt-24'>
            <CategoryFlexContent {...nftCategory} />
            <Category {...nft} />
          </div>
        </div>
      </main>
    </>
  );
}

export default CategoryNFT;
