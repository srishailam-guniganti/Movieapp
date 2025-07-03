import React from "react";

const FilterGroup = ({ miniRating, onRatingClick, ratings }) => {
  return (
    <div>
      <ul className="movie_filter">
        {ratings.map((rate) => (
          <li
            className={
              miniRating === rate
                ? "moviefilter_item active"
                : "moviefilter_item"
            }
            key={rate}
            onClick={() => onRatingClick(rate)}
          >
            {rate}+ star
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterGroup;
