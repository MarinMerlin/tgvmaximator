import React from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";

import API from "../../utils/API";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      trips: [],
      destination: "",
      origin: "",
      date: "",
      users: [],
      user: ""
    }
  }

  componentWillMount(){
    API.getDashboard().then((data) => {
      console.log(data.data);
      let trips = []
      data.data.map(trip => {
        let usefull_info = {
          'id': trip._id,
          'destination': trip.destination,
          'origin': trip.origin,
          'date': trip.date.split('T')[0],
          'users': []
        }
        trip.users.forEach(user => {
          usefull_info.users.push(user.name);
        })
        trips.push(usefull_info);
      })
      this.setState({trips : trips});
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  addUser = () => {
    this.setState(state => {
      const users = state.users.concat(state.user);
      return {
        users,
        user: '',
      };
    });
  };

  addNewTrip = () => {
    const new_trip = {
      origin: this.state.origin,
      destination: this.state.destination,
      users: this.state.users,
      date: this.state.date
    };
    console.log(new_trip);
    API.postNewTrip(new_trip);
  }

  removeTrip = (event) => {
    console.log(event.target.id)
    API.deleteTrip(event.target.id);
  }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  render() {
    const { trips, destination,origin,date,user } = this.state;
    return (
      <div className="Dashboard" style={{margin:"10vw"}}>
        <h1>Dashboard</h1>
        <Button onClick={this.disconnect} block type="submit">
          Se déconnecter
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Orign</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Users</th>
              <th>Remove trip</th>
            </tr>
          </thead>
          <tbody>
            {
            trips.map((trip,index)=> (
              <tr key={index}>
                <td>{index}</td>
                <td>{trip.origin}</td>
                <td>{trip.destination}</td>
                <td>{trip.date}</td>
                <td>{trip.users}</td>
                <td><Button id={trip.id} onClick={this.removeTrip}>Remove</Button></td>
              </tr>
            ))
            }
          </tbody>
        </Table>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="origin">
              <Form.Label>Origin</Form.Label>
              <Form.Control value={origin} onChange={this.handleChange} placeholder="PAR" />
            </Form.Group>
            <Form.Group as={Col} controlId="destination">
              <Form.Label>Destination</Form.Label>
              <Form.Control value={destination} onChange={this.handleChange} placeholder="MZM" />
            </Form.Group>
            <Form.Group as={Col} controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control value={date} onChange={this.handleChange} placeholder="2019-12-24" />
            </Form.Group>
            <Form.Group controlId="user">
              <Form.Label>Users</Form.Label>
              <Form.Control value={user} onChange={this.handleChange} placeholder="user.email@gmail.com" />
              <Button variant="primary" onClick={this.addUser}>
                Add user
              </Button>
            </Form.Group>
          </Form.Row>
          <Button onClick={this.addNewTrip} variant="primary">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}