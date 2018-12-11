import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import TripTable from './trips_table';

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/trips').then((response) => {
            this.setState({trips: response.data})
        });
    }
    render() {
        return (
            <div>
                <TripTable trips_details ={this.state.trips}/><br/>
                <button><Link to= "/trips/add">Add</Link></button>
            </div>
        )
    }
}

export default Trips;