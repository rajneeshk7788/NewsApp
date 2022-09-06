
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar/Navbar';
import News from './Components/News/News';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar/>
        <News pageSize={6}/>
        <h1>Hello my class bassed component</h1>
      </div>
    )
  }
}


