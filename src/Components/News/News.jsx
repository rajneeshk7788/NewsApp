import React, { Component } from 'react'
import Spiner from '../../Config/Spiner';
import NewsItem from './NewsItem'


export class News extends Component {

    constructor() {
        super();
        console.log("Hello I am A constructor from news components");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        // console.log("CDN")
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5d9268bb6bb044ed97c32e550a203c0f&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsData = await data.json();
        console.log(parsData)
        this.setState({ articles: parsData.articles, totalResults: parsData.totalResults })

    }

    handlePrevClick = async () => {
        console.log("Previos")

        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5d9268bb6bb044ed97c32e550a203c0f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsData = await data.json();
        this.setState({ articles: parsData.articles })
        this.setState({
            page: this.state.page - 1,
            articles: parsData.articles,
            loading: false
        })


    }

    handleNextClick = async () => {
        console.log("Next");
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5d9268bb6bb044ed97c32e550a203c0f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsData = await data.json();
        this.setState({ articles: parsData.articles })
        this.setState({
            page: this.state.page + 1,
            articles: parsData.articles,
            loading: false
        })

    }

    render() {

        return (
            <div className='container my-3'>
                <h1 className="text-center">This is a news component</h1>
                {this.state.loading && <Spiner />}
                <div className='row my-5'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (<div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>)
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News