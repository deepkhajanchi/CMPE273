import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../studentNavbar';
import Content from './studentSearchContent';

export default class StudentSearch extends Component {
  constructor(props) {
    super(props);
    
    // Functions
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);

    // State
    this.state = {
      search: '',
      students: [],
      allStudents: [],
      major: '',
    };
    axios.get('/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });
    axios.get('/students/get-all-students')
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          console.log(res.data);
        } else {
          this.setState({
            allStudents: res.data,
          });
        }
      });
  }
  onChangeSearch(e) {
    this.setState({ search: e.target.value }, () => {
      const { search } = this.state;
      if (search.length > 0) {
        const searchObject = {
          search,
        };
        axios.post('/students/search', searchObject)
          .then((response) => {
            console.log(response.data);

            this.setState({
              students: response.data,
            });
          });
      } else {
        this.setState({
          students: [],
        });
      }
    });
  }

  onChangeMajor(e) {
    this.setState({ major: e.target.value }, () => {
      // console.log(this.state.major);
      const { search, major } = this.state;
      if (search.length > 0) {
        const searchObject = {
          search,
          major,
        };

        axios.post('/students/filterMajor', searchObject)
          .then((response) => {
            console.log(response.data);

            this.setState({
              students: response.data,
            });
          });
      } else {
        this.setState({
          jobs: [],
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navigator />
        <Content
          onSubmit={this.onSubmit}
          state={this.state}
          onChangeSearch={this.onChangeSearch}
          onChangeMajor={this.onChangeMajor}
        />
      </div>

    );
  }
}
