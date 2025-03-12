import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllCategories } from "@/sanity/helpers/queries";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const categories = await getAllCategories();

  return (
    <Container className="py-10">
      <Title className="text-xl">
        Products by Category
      </Title>
      <CategoryProducts categories={categories} slug={slug} />
    </Container>
  );
};

export default CategoryPage;
