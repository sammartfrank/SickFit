import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage.js';
const SIGNUP_MUTATION = gql`
 mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
  signup(email: $email, name: $name, password: $password) {
   id
   email
   name
  }
 }
`;

class Signup extends Component {
 state = {
  email: '',
  name: '',
  password: '',
 };
 saveToState = (e) => {
  this.setState({
   [e.target.name]: e.target.value });
  console.log(this.state)
 };
 render() {
  return (
   <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
    {(signup, { error, loading }) => (
     <Form method="post" onSubmit={async e => {
       e.preventDefault();
       await signup();
       this.setState({
        email:'', name:'', password:''
       })
      }}>
       <Error error={error} />
       <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up</h2>
        <label htmlFor="email">
         Email:
         <input
          type="email"
          name="email"
          placeholder="email"
          value={this.state.email}
          required
          onChange={this.saveToState}
         />
        </label>
        <label>
        Name:
         <input
          type="text"
          name="name"
          placeholder="Insert your Name"
          value={this.state.name}
          required
          onChange={this.saveToState}
         />
        </label>
        <label>
        Password
         <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.saveToState}
         />
        </label>
        <button type="submit">Submit</button>
       </fieldset>
      </Form>
      )}
   </Mutation>
   )}
}

export default Signup;
