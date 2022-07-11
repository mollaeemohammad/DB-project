import { FC } from "react";

import "./rating-stars.css";

interface Props {
  stars: string;
  className?: string;
}

const RatingStars: FC<Props> = ({ stars,className }) => {
  const style = { "--rating": parseFloat(stars) } as React.CSSProperties;
  return (
    <div className={className}>
      <span className="stars" style={style}/>
    </div>
  );
};

export default RatingStars;
