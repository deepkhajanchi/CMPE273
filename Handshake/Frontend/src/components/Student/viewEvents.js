import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../studentNavbar';
import Content from './eventContent';

export default class ViewEvents extends Component {
  constructor(props) {
    super(props);

    // Functions
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onRegister = this.onRegister.bind(this);

    // State
    this.state = {
      search: '',
      events: [],
      registered: [],
      education: [],
      regMatch: false,
    };
    axios.get('/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });
    axios.get('/events/get-registered-events')
      .then((res) => {
        if (res.data.errno) {
          console.log(res.data);
        } else {
          this.setState({
            registered: res.data,
          });
        }
      });

    axios.get('/students/education')
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
    axios.get('/events/get-upcoming-events')
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          console.log("can't load events");
        } else {
          this.setState({
            events: res.data,
          });
        }
      });
  }

  onChangeSearchInput(e) {
    this.setState({ search: e.target.value }, () => {
      const { search} = this.state;
      if (search.length > 0) {
        const searchObject = {
          search: search,
        };
        axios.post('/events/search-upcoming-events', searchObject)
          .then((response) => {
            console.log(response.data);

            this.setState({
              events: response.data,

            });
          });
      } else {
        axios.get('/events/get-upcoming-events')
          .then((res) => {
            console.log(res.data);
            if (res.data.errno) {
              console.log("can't load events");
            } else {
              this.setState({
                events: res.data,
              });
            }
          });
      }
    });
  }

  onRegister(e) {
    console.log(e.target.id);
    const eventObject = {
      id: e.target.id,
    };

    axios.post('/events/get-event', eventObject)
      .then((res) => {
        console.log(res.data[0].eligibility);
        if (res.data.errno) {
          alert('Cannot update!');
        } else {
          if (res.data[0].eligibility === 'All') {
            this.setState({
              regMatch: true,
            });
          } else {
            const { education } = this.state;
            for (let i = 0; i < education.length; i += 1) {
              console.log(education[i].major);
              if (res.data[0].eligibility === education[i].major) {
                console.log('yee');
                this.setState({
                  regMatch: true,
                });
              }
            }
          }
          const { regMatch } = this.state;
          if (!regMatch) {
            alert('Your background seems different, keep checking for other events.');
            window.location.href = '/student/events';
          } else {
            console.log('in final else');
            console.log(res.data[0].id);
            const regObject = {
              event: res.data[0].id,
            };
            axios.post('/events/registerEvent', regObject)
              .then((responseL) => {
                if (responseL.data.errno) {
                  alert('You have already registered for this event');
                  window.location.href = '/student/events';
                } else {
                  alert('Registration successful!');
                  window.location.href = '/student/events';
                }
              });
          }
        }
      });
  }
  render() {
    return (
      <div>
        <Navigator />
        <Content
          state={this.state}
          onChangeSearchInput={this.onChangeSearchInput}
          onRegister={this.onRegister}
        />
      </div>
    );
  }
}
