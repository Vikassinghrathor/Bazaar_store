import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "./components/Banner";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    setProducts(data.data);
  }, [data]);

  return (
    <main>
      <Banner />
      <Products products={products} />
    </main>
  );
}

export default App;