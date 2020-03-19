import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigator from '../studentNavbar';
import Content from './viewProfileContent';

export default class ViewStudentProfileFromStudent extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      student: [],
      education: [],
      experience: [],
    };

    axios.get('/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`/students/getStudent/${params.id}`)
      .then(({ data: user }) => {
        console.log('user', user);
        this.setState({ student: user });
      });

    axios.get(`/students/educationBlind/${params.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          alert(res.data);
        } else {
          this.setState({
            education: res.data,
          });
        }
      });

    axios.get(`/students/experienceBlind/${params.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          alert(res.data);
        } else {
          this.setState({
            experience: res.data,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Navigator />
        <Content state={this.state} />
      </div>

    );
  }
}
ViewStudentProfileFromStudent.propTypes = {
  match: PropTypes.node.isRequired,
};
