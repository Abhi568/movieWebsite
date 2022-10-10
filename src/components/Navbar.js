import "./Navbar.css";
import React from "react";
import AllCard from "./AllCards";
import { useState, useEffect } from "react";
import "./../App";
import modeImage from "./../Images/dark-light-mode-png.png";

export default function Navbar() {
  const [dataForCurrentPage, setDataForCurrentPage] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [q, setQ] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [mode, setMode] = useState({
    color: "black",
    backgroundColor: "white",
  });
  const [textMode, setTextMode] = useState({
    color: "black",
  });
  const [backgroundMode, setBackgroundMode] = useState({
    backgroundColor: "#d6def7",
  });

  useEffect(() => {
    fetch(`https://movie-task.vercel.app/api/popular?page=${1}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setDataForCurrentPage(result.data);
          // childToParent(result.data)
          setOriginalData(JSON.parse(JSON.stringify(result.data)));
        },
        (error) => {
          // childToParent({})
          setIsLoaded(true);
          setDataForCurrentPage([]);
          setError(error);
        }
      );
  }, []);

  const enableMode = () => {
    if (mode.color === "black") {
      setMode({
        color: "white",
        backgroundColor: "black",
      });
      setTextMode({
        color: "white",
      });
      setBackgroundMode({
        backgroundColor: "#f1f1f1",
      });
    } else {
      setMode({
        color: "black",
        backgroundColor: "white",
      });
      setTextMode({
        color: "black",
      });
      setBackgroundMode({
        backgroundColor: "#d6def7",
      });
    }
  };
  const goToNextPage = () => {
    setSelectValue("None");
    setIsLoaded(false);
    setQ("");
    fetch(`https://movie-task.vercel.app/api/popular?page=${pageNumber + 1}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setDataForCurrentPage(result.data);
          setOriginalData(JSON.parse(JSON.stringify(result.data)));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const goToPreviousPage = () => {
    setSelectValue("None");
    setIsLoaded(false);
    setQ("");
    fetch(`https://movie-task.vercel.app/api/popular?page=${pageNumber - 1}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setDataForCurrentPage(result.data);
          setOriginalData(JSON.parse(JSON.stringify(result.data)));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setPageNumber((pageNumber) => pageNumber - 1);
  };

  const searchByTitle = (event) => {
    setSelectValue("None");
    setQ(event.target.value);
    if (error === null) {
      if (document.getElementById("f2").value !== null) {
        let { results } = originalData;
        let filteredData = results.filter((ele) => {
          return ele.original_title
            .toLowerCase()
            .includes(document.getElementById("f2").value.toLowerCase());
        });
        dataForCurrentPage.results = filteredData;
      }
    }
  };
  const selectByYear = (year) => {
    setQ("");
    console.log(year.target.value !== "None");
    if (year.target.value !== "None") {
      setSelectValue(year.target.value);
      let { results } = originalData;
      let filteredData = results.filter((ele) => {
        return (
          new Date(ele.release_date).getFullYear().toString() ===
          year.target.value
        );
      });
      dataForCurrentPage.results = filteredData;
      setDataForCurrentPage(dataForCurrentPage);
    } else {
      setSelectValue("None");
      setDataForCurrentPage(JSON.parse(JSON.stringify(originalData)));
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={mode}>
        <div className="container-fluid">
          <a className="navbar-brand fs-2 ms-4" href="" style={textMode}>
            bip.so
          </a>
          <div className="d-flex">
            <button
              className="navbar-toggler"
              style={{
                backgroundColor: mode.color === "white" ? "white" : "#c1baba",
              }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="dark-light-mode mx-4" onClick={enableMode}>
              <img
                src={modeImage}
                alt="Switch to dark and light mode"
                style={{ width: "2rem", height: "2rem" }}
              />
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href=""
                  style={textMode}
                >
                  Home
                </a>
              </li>
              <label className="fs-4 fw-semibold ms-3 d-flex align-items-center justify-content-center">
                Select Year
                <select
                  onChange={selectByYear}
                  value={selectValue}
                  className="ms-2"
                  style={mode}
                >
                  <option className="dropdown-items" value="None">
                    None
                  </option>
                  <option className="dropdown-items" value="2022">
                    2022
                  </option>
                  <option className="dropdown-items" value="2021">
                    2021
                  </option>
                  <option className="dropdown-items" value="2020">
                    2020
                  </option>
                  <option className="dropdown-items" value="2019">
                    2019
                  </option>
                  <option className="dropdown-items" value="2018">
                    2018
                  </option>
                  <option className="dropdown-items" value="2017">
                    2017
                  </option>
                  <option className="dropdown-items" value="2016">
                    2016
                  </option>
                  <option className="dropdown-items" value="2015">
                    2015
                  </option>
                </select>
              </label>
            </ul>
            <div className="d-flex justify-content-center block;">
              <input
                style={{ width: "20rem", ...backgroundMode }}
                className="form-control mx-2 my-2"
                type="search"
                placeholder="Search By Title"
                aria-label="Search"
                id="f2"
                value={q}
                onChange={searchByTitle}
              />
            </div>
          </div>
        </div>
      </nav>
      {
        <AllCard
          data={dataForCurrentPage}
          isLoaded={isLoaded}
          error={error}
          style={mode}
        />
      }
      {Object.keys(dataForCurrentPage).length > 0 && (
        <div className="d-flex justify-content-between px-4 py-4" style={mode}>
          <button
            type="button"
            className={
              mode.color === "black"
                ? "btn btn-outline-primary"
                : "btn btn-dark"
            }
            disabled={pageNumber < 1}
            onClick={goToPreviousPage}
          >
            Back
          </button>
          <button
            type="button"
            className={
              mode.color === "black"
                ? "btn btn-outline-primary"
                : "btn btn-dark"
            }
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
