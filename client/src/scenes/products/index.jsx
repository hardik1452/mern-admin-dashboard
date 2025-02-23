import React, { useState } from "react";
import {
  Box,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "../../state/api";
import Header from "../../components/Header";
import Product from "../../components/Product";



const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  console.log("data", data);
  return (
    <Box>
      <Header title="PRODUCTS" subTitle="See all the list of  products." />
      {data || !isLoading ? (
        <Box
          margin="15px 5px 0px 10px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
              key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
