// class based components
import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div className="user-card">
        <h1>Count {this.state.count}</h1>
        <h3>Name: {this.props.name}</h3>
        <h4>Location: Hyderabad</h4>
        <h4>Contact: prasad@gmail.com</h4>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Increment
        </button>
      </div>
    );
  }
}
export default UserClass;
