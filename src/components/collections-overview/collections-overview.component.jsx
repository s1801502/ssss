import React from "react";
import "./collections-overview.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PreviewCollection from '../preview-collection/preview-collection.component'
import { selectShopCollections } from '../../redux/shop/shop.selectors'

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherProps }) => (
      <PreviewCollection key={id} {...otherProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
})

export default connect(mapStateToProps)(CollectionsOverview)