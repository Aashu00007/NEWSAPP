import React, { useState } from "react";
import { useEffect } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capatilize(props.category)}-NewsMonkey`;

   const capatilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };



const updateNews = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  
}
useEffect(() => {
  updateNews();
}, [])

const handleNextClick = async () => {
  setPage(page-1);
  updateNews();
};
const handlePreClick = async () => {
  setPage(page+1);
  updateNews();
};


return (
  <div className="container my-3">
    <h1 className="text-center " style={{ margin: "35px 0px" }}>
      {" "}
      NewsMonkey-Top headline from {capatilize(props.category)}
    </h1>
    {loading && <Spinner />}

    <div className="row">
      {
        articles.map((element) => {
          return (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageurl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          );
        })}
    </div>
    <div className="container d-flex justify-content-between">
      <button
        type="button"
        disabled={this.state.page <= 1}
        className="btn btn-dark"
        onClick={this.handlePreClick}
      >
        {" "}
        &larr; Previous
      </button>
      <button
        type="button"
        disabled={
          this.state.page + 1 >
          Math.ceil(this.state.totalResults / props.pageSize)
        }
        className="btn btn-dark"
        onClick={this.handleNextClick}
      >
        Next &rarr;
      </button>
    </div>
  </div>
);
          
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


}


export default News;
