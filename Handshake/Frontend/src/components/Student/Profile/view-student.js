import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigator from '../../Company/companyNavbar';
import Content from './viewProfileContent';

export default class ViewStudentProfileFromCompany extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      student: [],
      education: [],
      experience: [],
    };

    axios.get('/companies/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isCompany) {
          window.location.href = '/company-signin';
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
ViewStudentProfileFromCompany.propTypes = {
  match: PropTypes.node.isRequired,

};
