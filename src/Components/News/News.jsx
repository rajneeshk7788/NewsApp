import React, { Component } from 'react'
import Spiner from '../../Config/Spiner';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: PropTypes.string,

    }
    PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

    constructor(props) {
        super(props);
        console.log("Hello I am A constructor from news components");
        this.state = {
            articles: [],
            loading: false,
            page: 1 
        }
       
    }

    async updateNews() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d9268bb6bb044ed97c32e550a203c0f&page=1&pageSize=${this.props.pageSize}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6406802a6c2547a1be20912d9ad7e730&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsData = await data.json();
        console.log('HERE parsData', parsData)
        this.setState({ articles: parsData.articles, totalResults: parsData.totalResults })
    }

    componentDidMount() {

        this.updateNews();

    }

    handlePrevClick = () => {
        console.log("Previos")
        this.setState({ page: this.state.page - 1 })
        this.updateNews();


    }

    handleNextClick = () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 })
        this.updateNews();

    }

    render() {

        console.log(this.props.pageSize, this.state.page, this.state.totalResults)

        return (
            <div className='container my-3'>
                <h1 className="text-center">News App - Headline on  </h1>
                {this.state.loading && <Spiner />}
                <div className='row my-5'>
                    {!this.state.loading && this.state.articles && this.state.articles?.map((element) => {
                        return (<div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url}
                                author={element.author} date={element.publishedAt
                                } />
                        </div>)
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News