import React from "react";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";
// import components

import Home from "./pages/Home";
import HeaderBar from "./components/HeaderBar";
import ProductCreatePage from "./pages/product/ProductCreatePage";
import ProductSearchPage from "./pages/product/ProductSearchPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import ProductOptionUpdatePage from "./pages/productOption/ProductOptionUpdatePage";

const App = () => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
  });

  return (
    <ApolloProvider client={client}>
      <HeaderBar />
      <div style={{ marginTop: "10%" }}></div>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/create" component={ProductCreatePage} />
        <Route exact path="/product/search" component={ProductSearchPage} />
        <Route
          exact
          path="/product/update/:productId"
          component={ProductCreatePage}
        />
        <Route
          exact
          path="/productOption/update/:productOptionId"
          component={ProductOptionUpdatePage}
        />
        <Route exact path="/product/:productId" component={ProductDetailPage} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
