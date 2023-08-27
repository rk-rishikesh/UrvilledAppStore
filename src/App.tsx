import { Cart, Footer, Navbar } from "./components";
import { NavRoutes } from "./routes/NavRoutes";

function App() {

  return (
    <>
      <div className="h-full justify-between">
        <NavRoutes />
        <Navbar />
        <Cart />
        <Footer />
      </div>

    </>
  );
}

export default App;
