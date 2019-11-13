import React, { Component } from 'react';
import './marvel.css';

export default class marvel extends Component {
    state={
        heroes: []
    };

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('heroes') === null)
                this.setState({ heroes: [] });
            else
                this.setState({ heroes: JSON.parse(localStorage.getItem('heroes'))});
        }
        let ts = "marvelapi";
        let privateKey = "64d56e0a137c74290fd7933ff0b55ffd20a6a395";
        let publicKey = "b91f0ac5a6621decb5b68dd21533367c";
        let md5 = require("blueimp-md5");
        let hash = md5(ts+privateKey+publicKey);
        fetch("https://gateway.marvel.com:443/v1/public/characters?ts="+ts+"&hash="+hash+"&apikey="+publicKey)
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({
                    heroes: res.data.results
                });
                localStorage.setItem('heroes', JSON.stringify(res.data.results));
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                {
                    this.state.heroes.length === 0 ?
                        <h1>Loading</h1>
                        :
                        this.state.heroes.map((heroeInfo,key) =>
                            <div key={key} className="card">
                                <img src={heroeInfo['thumbnail']['path'] +"."+ heroeInfo['thumbnail']['extension']} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h5 className="card-title">{heroeInfo['name']}</h5>
                                    <p className="card-text">{heroeInfo['description']}</p>
                                </div>
                            </div>
                        )
                }
                </div>
            </div>
        );
    }
}

