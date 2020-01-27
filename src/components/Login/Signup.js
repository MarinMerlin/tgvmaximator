import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import API from "../../utils/API";

class Signup extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        cpassword: ""
    };

    signup = async () => {
        const { name, email, password, cpassword} = this.state;
        if (!email || email.length === 0) {
            return;
        }
        if (!password || password.length === 0 || password !== cpassword) {
            return;
        }
        if (!name || name.length === 0) {
            return;
        }
        let object = {name,email,password};
        try {
            const { data } = await API.signup(object);
            localStorage.setItem("token", data.token);
            window.location = "/dashboard";
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        });
    };

    render() {
        const { email, password, cpassword, name } = this.state;
        return (
            <div className="Signup">
              <FormGroup controlId="name" bssize="large">
                <FormControl
                  autoFocus
                  type="name"
                  value={name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="email" bssize="large">
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bssize="large">
                <FormControl
                  value={password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="cpassword" bssize="large">
                <FormControl
                    value={cpassword}
                    onChange={this.handleChange}
                    type="password"
                />
              </FormGroup>
              <Button onClick={this.signup} block bssize="large" type="submit">
                Connexion
              </Button>
            </div>
        );
    }
}
export default Signup;