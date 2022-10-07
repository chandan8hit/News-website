import React from 'react'
//import PropTypes from 'prop-types'
import MyImage from './IMG_4578.JPG'


const Newsitem = (props) => {
  let { title, description, imageurl, NewsUrl, publishedAt, Author, source } = props;
  return (
    <div className='my-3'>
      <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ right: '-16%', zIndex: '1' }}>{source}</span>
        <img src={imageurl ? imageurl : MyImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {Author ? Author : "Unknown"} on {(new Date(publishedAt)).toGMTString()}</small></p>
          <a rel="noreferrer" href={NewsUrl} target="_blank" className="btn btn-sm btn-primary">More</a>
        </div>
      </div>
    </div>
  )
}
export default Newsitem;