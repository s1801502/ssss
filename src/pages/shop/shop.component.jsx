import React, { Component } from "react";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CategoryPage from '../category/category.component'

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact to={`${match.path}`} component={CollectionsOverview} />
    <Route exact to={`${match.path}/:categoryId`} component={CategoryPage} />
  </div>
);


export default ShopPage;
