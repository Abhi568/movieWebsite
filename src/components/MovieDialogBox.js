import React from "react";
import "./MovieDialogBox.css";
import LoadingSpinner from "./Spinner";

export default function MovieDialogBox(props) {
  let data = {};
  let index = 0;
  data =
    props.currMovieData && props.currMovieData.data
      ? props.currMovieData.data
      : {};
  let mode = props.mode;
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={mode}>
            <div className="modal-header mb-2">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {data ? data.original_title : ""}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "white" }}
              ></button>
            </div>
            <div className="movie-dialog-container">
              {Object.keys(data).length > 0 ? (
                <div className="col-5">
                  <img
                    className="movie-dialog-image col-5 "
                    src={
                      "https://image.tmdb.org/t/p/original" + data.poster_path
                    }
                    alt=""
                  />
                </div>
              ) : (
                <>
                  <LoadingSpinner />{" "}
                </>
              )}
              <div className="movie-dialog-details col-6 ms-4">
                <h6>Title : {data ? data.original_title : ""}</h6>
                <h6>Budget : {data ? data.budget : 0}$</h6>
                <h6>Revenue : {data ? data.revenue : 0}$</h6>
                <h6> Rating : {data ? data.vote_average : ""}/10</h6>
                <div className="row">
                  {Object.keys(data) > 0 &&
                    data.spoken_languages.map((ele) => {
                      index = index + 1;
                      return (
                        <h6 key={index}>
                          {" "}
                          {index === 1 && <span>Languages :</span>} {ele.name}{" "}
                          {index !== data.spoken_languages.length && <i>,</i>}{" "}
                        </h6>
                      );
                    })}
                </div>
                <h6>Votes : {data ? data.vote_count : ""} 👍</h6>
                <h6>Populairty : {data ? data.popularity : ""}</h6>
                <h6> {data ? data.adult : ""}</h6>
                <h6> Status : {data ? data.status : ""}</h6>
                <h6>Release Date : {data ? data.release_date : ""}</h6>
              </div>
            </div>
            <div className="modal-body">{data ? data.overview : ""}</div>
          </div>
        </div>
      </div>
      {/* //  :<>Loading</>       } */}
    </>
  );
}
