import { FlexContent, Hero } from "../components";
import Categories from "../components/Categories";
import DApp from "../components/DApp";

import { categories, highlight, sneaker } from '../data/data'

function Home() {

  return (
    <>
      <main className="flex flex-col gap-16 relative">
        <Hero />
        <FlexContent {...highlight} />
        <FlexContent {...sneaker} />
        <Categories {...categories} />
      </main>
    </>
  );
}

export default Home;
