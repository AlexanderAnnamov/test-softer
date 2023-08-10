import React from "react";
import ContentLoader from "react-content-loader";

const userSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={226}
    height={57}
    viewBox="0 0 226 57"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="205" cy="29" r="20" />
    <rect x="2" y="8" rx="5" ry="5" width="161" height="15" />
    <rect x="2" y="33" rx="5" ry="5" width="101" height="16" />
  </ContentLoader>
);

export default userSkeleton;
