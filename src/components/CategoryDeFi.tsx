import CategoryFlexContent  from "./CategoryFlexContent";
import Category from "./Category";
import { defi, defiCategory } from '../data/data'

function CategoryDeFi() {

  return (
    <>
      <main className="flex flex-col gap-16 relative">
        <div className='relative opacity-100 z-20 grid items-center justify-items-center'>
          <div className='grid items-center justify-items-center mt-28 md:mt-24'>
            <CategoryFlexContent {...defiCategory} />
            <Category {...defi} />
          </div>

        </div>

      </main>
    </>
  );
}

export default CategoryDeFi;
