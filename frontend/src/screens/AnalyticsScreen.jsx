import React, { useEffect, useState } from "react";
import { useGetAllFilmForChartQuery } from "../slices/filmApiSlice";
import CustomGraph from "../components/CustomGraph";
import Loader from "../components/Loader";

const AnalyticsScreen = () => {
  const [movieData, setMovieData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  console.log("genreData", genreData);
  const { data: newData, isLoading } = useGetAllFilmForChartQuery();
  //   console.log("newData", newData);
  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.7)`;
  };
  //   console.log("movieData", movieData);
  useEffect(() => {
    if (newData && !isLoading) {
      const aggregatedData = newData?.reduce((acc, movie) => {
        const year = movie?.releaseYear;
        const genre = movie?.genre;

        if (!acc[year]) {
          acc[year] = {};
        }

        if (!acc[year][genre]) {
          acc[year][genre] = 0;
        }

        acc[year][genre]++;

        return acc;
      }, {});

      if (aggregatedData) {
        const labels = Object?.keys(aggregatedData)?.map(String);
        const datasets = Object?.keys(
          newData?.reduce((acc, movie) => ({ ...acc, [movie.genre]: true }), {})
        );
        const dataForChart = {
          labels,
          datasets: datasets?.map((genre) => ({
            label: genre,
            data: labels?.map((year) => aggregatedData[year]?.[genre] || 0),
            backgroundColor: getRandomColor(),
          })),
        };
        setMovieData(dataForChart);
      }
    }
  }, [newData, isLoading]);

  useEffect(() => {
    if (newData && !isLoading) {
      const aggregatedData = newData?.reduce((acc, movie) => {
        const genre = movie?.genre;

        if (!acc[genre]) {
          acc[genre] = 0;
        }

        acc[genre]++;

        return acc;
      }, {});

      if (aggregatedData) {
        const labels = Object.keys(aggregatedData)?.map(String);
        const dataForChart = {
          labels,
          datasets: [
            {
              label: "Total Movies",
              data: Object.values(aggregatedData),
              backgroundColor: "#94d2bd",
            },
          ],
        };
        setGenreData(dataForChart);
      }
    }
  }, [newData, isLoading]);

  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Genre of film created in each year",
      },
    },
  };

  const optionsGenre = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Total Number of genre for the picture is created",
      },
    },
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h2>All Movies Analysis</h2>
      {movieData && (
        <div className="my-4">
          <CustomGraph options={options} data={movieData} />
          <CustomGraph options={optionsGenre} data={genreData} />
        </div>
      )}
    </div>
  );
};

export default AnalyticsScreen;
