import React from "react";
import ContentLoader from "react-content-loader";

const FileSkeleton: React.FC = () => (
  
  <ContentLoader
    speed={2}
    width={58}
    height={72}
    viewBox="0 0 58 72"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="7" y="10" rx="5" ry="5" width="41" height="34" />
    <rect x="7" y="54" rx="7" ry="7" width="42" height="12" />
  </ContentLoader>
);

export default FileSkeleton;
