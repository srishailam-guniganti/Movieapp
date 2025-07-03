import React, { useEffect, useState } from "react";
import star from '../../assets/star.png'
import './Moviecard.css'
const Moviecard = ({movie}) => {
  
    return (
      <a href={`https://www.themoviedb.org/movie/${movie.id} target='_blank'`} className="moviecard">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie-poster"
          className="movie_poster"
        />
        <div className="movie_details">
          <h3 className="moviedetails_heading">{movie.original_title}</h3>
          <div className="moviedate_rate">
            <p>{movie.release_date}</p>
            <p>
              {movie.vote_average}
              <img src={star} alt="rating_icon" className="card_emoji" />
            </p>
          </div>
          <p className="movie_description">
            {movie.overview.slice(0, 100) + "..."}
          </p>
        </div>
      </a>
    );
}
export default Moviecard;