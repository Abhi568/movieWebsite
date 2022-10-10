import React from "react";
import Card from "./Card";
import LoadingSpinner from "./Spinner";
import { useState } from "react";

export default function AllCards(props) {
  let data = props.data;
  let isLoaded = props.isLoaded;
  let error = props.error;
  let mode = props.style;

  const [currMovieData, setCurrMovieData] = useState({});
  const setTheData = async (movieReleaseID) => {
    setCurrMovieData({});
    let data = await fetch(
      `https://movie-task.vercel.app/api/movie?movieId=${movieReleaseID}`
    );
    let jsonCurrMovieData = await data.json();
    setCurrMovieData(jsonCurrMovieData);
  };

  if (error) {
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center text-bg-secondary"
          style={{ height: "100vh", width: "100%" }}
        >
          <h2 className="text-center text-danger">{error.message}</h2>
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <LoadingSpinner width={"3rem"} height={"3rem"} mode={mode} />
      </>
    );
  } else {
    return (
      <>
        <div className="px-4 py-4 " style={mode}>
          <h1 className="text-center">Top {data.results.length} Movies 📽️</h1>
          <div className="row">
            {data.results.map((ele) => {
              return (
                <div
                  className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2"
                  key={ele.id}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setTheData(ele.id)}
                >
                  <Card
                    title={ele.original_title}
                    description={ele.overview}
                    rating={ele.vote_average}
                    image={ele.poster_path}
                    releaseDate={ele.release_date}
                    currMovieData={currMovieData}
                    mode={mode}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
