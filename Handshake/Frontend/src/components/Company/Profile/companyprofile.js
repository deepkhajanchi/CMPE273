import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../companyNavbar';
import Content from './companyProfileContents';

export default class CompanyProfile extends Component {
  constructor(props) {
    super(props);

    // Functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLoc = this.onChangeLoc.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
    this.onChangeCompanyPhone = this.onChangeCompanyPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      loc: '',
      description: '',
      email: '',
      phone: '',
      profPic: '',
    };
    axios.get('/companies/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isCompany) {
          window.location.href = '/company-signin';
        } else {
          this.setState({
            name: res.data.user.name,
            loc: res.data.user.loc,
            description: res.data.user.description,
            email: res.data.user.email,
            phone: res.data.user.phone,
            profPic: '/company_upload/profPic/',
          });
        }
      });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeLoc(e) {
    this.setState({ loc: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeCompanyEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeCompanyPhone(e) {
    this.setState({ phone: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      name, loc, description, email, phone,
    } = this.state;
    const companyObject = {
      name,
      loc,
      description,
      email,
      phone,
    };

    axios.put('/companies/update-company', companyObject)
      .then((res) => {
        console.log(res);
        if (res.data.errno) {
          alert('Please try again');
        } else {
          alert('Successfully updated!');
          window.location.href = '/company/profile';
        }
      });
  }

  onUpload(e) {
    console.log(this);
    e.preventDefault();
    const { files } = document.getElementById('INPUT_TAG');
    console.log(files);
    const formData = new FormData();
    formData.append('image', files[0]);
    // console.log(formData);
    axios.post('/company_upload/profPic', formData)
      .then((res) => {
        if (res.data.errno) {
          alert('Please try again');
        } else {
          alert(res.data);
          window.location.href = '/company/profile';
        }
      });
    console.log(files[0]);
  }

  render() {
    return (
      <div>
        <Navigator />
        <Content
          onSubmit={this.onSubmit}
          state={this.state}
          onChangeName={this.onChangeName}
          onChangeLoc={this.onChangeLoc}
          onChangeDescription={this.onChangeDescription}
          onChangeCompanyEmail={this.onChangeCompanyEmail}
          onChangeCompanyPhone={this.onChangeCompanyPhone}
          onUpload={this.onUpload}
        />
      </div>
    );
  }
}
