import React from "react";
import "./Card.css";
import MovieDialog from "./MovieDialogBox";

export default function Card(props) {
  let { title, description, rating, image, releaseDate, currMovieData, mode } = props;

  return (
    <>
      <div className="card" style={{...mode , border:'1px solid #9a9a9a'}}>
        <img
          src={"https://image.tmdb.org/t/p/original" + image}
          className="card-img-top px-2 pt-2"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {title
              ? title.length > 13
                ? title.slice(0, 13) + "..."
                : title
              : ""}
          </h5>
          <p className="card-text">
            {description
              ? description.length > 140
                ? description.slice(0, 140) + "..."
                : description
              : ""}
          </p>
          <div className="row">
            <h6 className="rating-title">
              Rating : <cite>{rating} </cite>
            </h6>
          </div>
          <div className="row">
            <h6 className="rating-title">Release Date : {releaseDate}</h6>
          </div>
        </div>
      </div>
      <MovieDialog currMovieData={currMovieData} mode = {mode}/>
    </>
  );
}
