import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../companyNavbar';
import Content from './studentSearch';

export default class CompanyStudentsTab extends Component {
  constructor(props) {
    super(props);

    // Functions
    this.onChangeSearch = this.onChangeSearch.bind(this);

    // State
    this.state = {
      search: '',
      students: [],
    };
    axios.get('/companies/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isCompany) {
          window.location.href = '/company-signin';
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
            // update the state with the response data
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

  render() {
    return (
      <div>
        <Navigator />
        <Content
          onSubmit={this.onSubmit}
          state={this.state}
          onChangeSearch={this.onChangeSearch}
        />
      </div>
    );
  }
}
