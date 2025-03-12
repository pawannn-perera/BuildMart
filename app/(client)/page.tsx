import Container from "@/components/Container";
import React, { Suspense, lazy } from "react";

const HomeBanner = lazy(() => import("@/components/HomeBanner"));
const ProductGrid = lazy(() => import("@/components/ProductGrid"));

export default function Home() {
  return (
    <div>
      <Container className="py-10">
        <Suspense fallback={<div>Loading Banner...</div>}>
          <HomeBanner />
        </Suspense>
        <Suspense fallback={<div>Loading Products...</div>}>
          <ProductGrid />
        </Suspense>
      </Container>
    </div>
  );
}
