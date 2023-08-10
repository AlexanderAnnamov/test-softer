import React from "react";
import ContentLoader from "react-content-loader";

const FileSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={80}
    height={74}
    viewBox="0 0 80 74"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="7" rx="6" ry="6" width="44" height="41" />
    <rect x="11" y="57" rx="7" ry="7" width="55" height="12" />
    <rect x="58" y="7" rx="4" ry="4" width="14" height="15" />
    <rect x="58" y="25" rx="4" ry="4" width="14" height="15" />
  </ContentLoader>
);

export default FileSkeleton;
