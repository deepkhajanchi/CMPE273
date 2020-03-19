import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../studentNavbar';
import Content from './jobSearch';

export default class JobSearch extends Component {
  constructor(props) {
    super(props);

    //functions
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onChangeSearchFilter = this.onChangeSearchFilter.bind(this);
    this.onChangeSearchLoc = this.onChangeSearchLoc.bind(this);
    this.onUpload = this.onUpload.bind(this);

    //state
    this.state = {
      search: '',
      loc: '',
      cat: '',
      jobs: [],
      studentName: '',
      selectedFT: false,
      selectedPT: false,
      selectedON: false,
      selectedIN: false,
    };
    axios.get('/students/user')
      .then((res) => {
        console.log(res.data);
if(res.data.isStudent){
  this.setState({
    studentName: res.data.user.name,
  })
}
          });
        }
  onChangeSearchInput(e) {
    console.log('etargetval');
    console.log(e.target.value);
    this.setState({ search: e.target.value }, () => {
      const {
        search, selectedFT, selectedPT, selectedON, selectedIN, loc,
        jobs,
      } = this.state;
      if (search.length > 0) {
        const filter = [];
        const filterObject = {
          'Full Time': selectedFT,
          'Part Time': selectedPT,
          'On Campus': selectedON,
          Intern: selectedIN,
        };
        Object.keys(filterObject).forEach((key) => {
          if (filterObject[key] === true) {
            filter.push(key);
          }
        });
        const searchObject = {
          search,
          loc,
        };

        axios.post('/jobs/searchJobs', searchObject)
          .then((response) => {
            if (filter.length > 0) {
              for (let i = 0; i < response.data.length; i += 1) {
                if (filter.includes(response.data[i].cat)) {
                  jobs.push(response.data[i]);
                }
              }
            } else {
              this.setState({
                jobs: response.data,
              });
            }
          });
      } else {
        this.setState({
          jobs: [],
        });
      }
    });
  }

  onChangeSearchFilter() {
    const {
      search, selectedFT, selectedPT, selectedON, selectedIN, loc,
    } = this.state;
    if (search.length > 0) {
      const filter = [];
      const filterObject = {
        'Full Time': selectedFT,
        'Part Time': selectedPT,
        'On Campus': selectedON,
        Intern: selectedIN,
      };
      console.log(filterObject);
      Object.keys(filterObject).forEach((key) => {
        if (filterObject[key] === true) {
          console.log(key);
          filter.push(key);
        }
      });
      const searchObject = {
        search,
        loc,
      };

      axios.post('/jobs/searchJobs', searchObject)
        .then((response) => {
          this.setState({
            jobs: [],
          });
          if (filter.length > 0) {
            const filtered = [];
            for (let i = 0; i < response.data.length; i += 1) {
              if (filter.includes(response.data[i].cat)) {
                filtered.push(response.data[i]);
              }
            }
            this.setState({
              jobs: filtered,
            });
          } else {
            this.setState({
              jobs: response.data,
            });
          }
        });
    } else {
      this.setState({
        jobs: [],

      });
    }
  }

  onChangeSearchLoc(e) {
    this.setState({ loc: e.target.value }, () => {
      const {
        search, selectedFT, selectedPT, selectedON, selectedIN, loc, jobs,
      } = this.state;
      if (search.length > 0) {
        const filter = [];
        const filterObject = {
          'Full Time': selectedFT,
          'Part Time': selectedPT,
          'On Campus': selectedON,
          Intern: selectedIN,
        };
        Object.keys(filterObject).forEach((key) => {
          if (filterObject[key] === true) {
            filter.push(key);
          }
        });
        const searchObject = {
          search,
          loc,
        };

        axios.post('/jobs/searchJobs', searchObject)
          .then((response) => {
            if (filter.length > 0) {
              for (let i = 0; i < response.data.length; i += 1) {
                if (filter.includes(response.data[i].cat)) {
                  jobs.push(response.data[i]);
                }
              }
            } else {
              this.setState({
                jobs: response.data,
              });
            }
          });
      } else {
        this.setState({
          jobs: [],
        });
      }
    });
  }

  onUpload(e) {
    console.log(this);
    console.log(e.target.value);
    e.preventDefault();
    const { files } = document.getElementById('INPUT_TAG');
    console.log(files.length);
    if (files.length === 0) {
      alert('Submit your application by uploading a resume!');
    } else {
      const formData = new FormData();
      formData.append('resume', files[0]);
      const applyObject = {
        id: e.target.value,
      };
      console.log(applyObject);
      axios.post('/applications/jobApply', applyObject);
      axios.post('/student_upload/resume', formData)
        .then((res) => {
          if (res.data.errno) {
            alert('Could not update');
          } else {
            alert(res.data);
          }
        });
      console.log(files[0]);
    }
  }
  render() {
    return (
      <div>
        <Navigator />
        <Content
          state={this.state}
          onChangeSearchInput={this.onChangeSearchInput}
          onChangeSearchFilter={this.onChangeSearchFilter}
          onChangeSearchLoc={this.onChangeSearchLoc}
          onUpload={this.onUpload}
        />
      </div>
    );
  }
}
