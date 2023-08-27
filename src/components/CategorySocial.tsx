import CategoryFlexContent  from "./CategoryFlexContent";
import Category from "./Category";
import { social, socialCategory } from '../data/data'

function CategorySocial() {

  return (
    <>
      <main className="flex flex-col gap-16 relative">
        <div className='relative opacity-100 z-20 grid items-center justify-items-center'>
          <div className='grid items-center justify-items-center mt-28 md:mt-24'>
            <CategoryFlexContent {...socialCategory} />
            <Category {...social} />
          </div>

        </div>

      </main>
    </>
  );
}

export default CategorySocial;
