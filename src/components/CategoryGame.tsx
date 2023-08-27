import CategoryFlexContent from "./CategoryFlexContent";
import Category from "./Category";
import { game, gameCategory } from '../data/data'

function CategoryGame() {

  return (
    <>
      <main className="flex flex-col gap-16 relative">
        <div className='relative opacity-100 z-20 grid items-center justify-items-center'>
          <div className='grid items-center justify-items-center mt-28 md:mt-24'>
            <CategoryFlexContent {...gameCategory} />
            <Category {...game} />
          </div>

        </div>

      </main>
    </>
  );
}

export default CategoryGame;
