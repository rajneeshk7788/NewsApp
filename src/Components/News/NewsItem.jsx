import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl,date, author } = this.props;
        return (
            <div className='my-4'>
                <div className="card" >
                    <div className='img'>
                        <img src={imgUrl?imgUrl:'https://thumbs.dreamstime.com/b/d-world-news-background-digital-breaking-studio-report-live-208423108.jpg'} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description?.length > 80 ? description.slice(0, 80)+'...' : description}</p>
                        <p className='card-text'> <small className='text-muted'>By {author?author:""} on {date?new Date(date).toGMTString():""}</small> </p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem