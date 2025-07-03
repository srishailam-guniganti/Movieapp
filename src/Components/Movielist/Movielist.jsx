import React, { useEffect, useState } from "react";
import "./Movielist.css";
import fire from "../../assets/fire.png";
import Moviecard from "./Moviecard";
import FilterGroup from "./Filtergroup";

const Movielist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [miniRating, setMiniRating] = useState(0);
  const [filterMovies, setFilterMovies] = useState([]);
  const [sort, setSort] = useState({ by: "default", order: "asc" });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = [...filterMovies].sort((a, b) => {
        if (sort.by === "release_date") {
          return sort.order === "asc"
            ? new Date(a[sort.by]) - new Date(b[sort.by])
            : new Date(b[sort.by]) - new Date(a[sort.by]);
        } else {
          return sort.order === "asc"
            ? a[sort.by] - b[sort.by]
            : b[sort.by] - a[sort.by];
        }
      });
      setFilterMovies(sortedMovies);
    }
  }, [sort, filterMovies]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=8f2e0ddf6b4d9e1b555b21cdebd6ebb0"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results);
      setFilterMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleFilter = (rate) => {
    if (rate === miniRating) {
      setMiniRating(0);
      setFilterMovies(movies);
    } else {
      setMiniRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list">
      <header className="movielist_header">
        <h2 className="movielist_heading">
          Popular
          <img src={fire} alt="fire emoji" className="navbar_emoji" />
        </h2>
        <div className="movielist_fs">
          <FilterGroup
            miniRating={miniRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            id="sortby"
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">Sort by</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id="order"
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <Moviecard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movielist;
