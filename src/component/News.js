import React, { useState, useEffect } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  // document.title =   capitalizeFirstLetter(`${ props.category}-ChandNews`);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const update = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = capitalizeFirstLetter(`${props.category}-ChandNews`);
    update();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };

  /* const handlePrevClick = async () => {
     setpage(page - 1);
     update();
   };
 
   const handleNextClick = async () => {
     if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
 
     }
     else {
       setpage(page + 1);
       update();
     }
   };*/

  let { setProgress } = props;
  return (
    <>
      <h1 className="text-center" style={{ margin: '5% 0 0 0' }}>ChandNews -{capitalizeFirstLetter(props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll dataLength={articles.length} next={fetchMoreData}
        hasMore={articles.length != totalResults} loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {!loading && articles.map((e) => {
              return (
                <div className="col-md-4" key={e.url}>
                  <NewsItem title={e.title ? e.title.slice(0, 40) : ""} description={e.description ? e.description.slice(0, 85) : ""} imageurl={e.urlToImage} NewsUrl={e.url} publishedAt={e.publishedAt} Author={e.author} source={e.source.name} />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/*<div className="container d-flex justify-content-between">
          <button disabled={ .page <= 1} type="button" className="btn btn-dark" onClick={  handlePrevClick}>&larr; Previous </button>
          <button disabled={ .page + 1 > Math.ceil( .totalResults /  props.pageSize)} type="button" className="btn btn-dark" onClick={  handleNextClick} > Next &rarr;</button>
        </div>*/}
    </>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: '10',
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;
