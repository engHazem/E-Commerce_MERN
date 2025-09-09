import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constans/baseUrl";

function HomePage() {
  const [products, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(true)
      }
    };
    fetchProducts();
  }, []);

    if (error) {
        return <div>Something went wrong! please try again</div>;
    }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
function setError(arg0: boolean) {
    throw new Error("Function not implemented.");
}

