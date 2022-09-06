import React, { Component } from 'react';
import loading from './loading.gif'

class Spiner extends Component {
    render() {
        return (
            <div>
                <img src={loading} alt="" />
            </div>
        );
    }
}

export default Spiner;