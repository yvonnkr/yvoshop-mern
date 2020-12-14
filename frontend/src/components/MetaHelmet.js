import React from "react";
import { Helmet } from "react-helmet";

const MetaHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

MetaHelmet.defaultProps = {
  title: "Welcome To YvoShop",
  description: "We sell the best products for cheap prices",
  keywords: "electronics,buy electronics,cheap electronics",
};

export default MetaHelmet;

//We sell the best products for cheap prices
//electronics,buy electronics,cheap electronics
