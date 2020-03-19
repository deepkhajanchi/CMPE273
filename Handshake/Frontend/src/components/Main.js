import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './home';
import CreateStudent from './Student/createStudent';
import CreateCompany from './Company/createcompany';
import CompanySignin from './Company/company-signin';
import StudentSignin from './Student/studentSignin';
import CompanyJobPosting from './Company/Landing/companylanding';
import CompanyProfile from './Company/Profile/companyprofile';
import CompanyStudentsTab from './Company/StudentsTab/company-studentsTab';
import MakeEvents from './Company/Events/setEvent';
import JobSearch from './Student/Landing/studentLanding';
import StudentProfile from './Student/Profile/studentProfile';
import ViewStudentProfileFromCompany from './Student/Profile/view-student';
import ViewStudentProfileFromStudent from './Student/Profile/view-studentFromStudent';
import ViewCompanyProfile from './Company/Profile/viewCompany';
import Applications from './Student/Applications/jobApplications';
import ViewEvents from './Student/Events/viewEvents';
import StudentSearch from './Student/StudentSearch/Searchstudents';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup-student" component={CreateStudent} />
    <Route exact path="/signup-company" component={CreateCompany} />
    <Route exact path="/company-signin" component={CompanySignin} />
    <Route exact path="/student-signin" component={StudentSignin} />
    <Route exact path="/company/landing" component={CompanyJobPosting} />
    <Route exact path="/company/profile" component={CompanyProfile} />
    <Route exact path="/company/students" component={CompanyStudentsTab} />
    <Route exact path="/company/events" component={MakeEvents} />
    <Route exact path="/student/landing" component={JobSearch} />
    <Route exact path="/student/profile" component={StudentProfile} />
    <Route exact path="/student/applications" component={Applications} />
    <Route exact path="/student/events" component={ViewEvents} />
    <Route exact path="/student/students" component={StudentSearch} />
    <Route exact path="/company/student/:id" component={ViewStudentProfileFromCompany} />
    <Route exact path="/student/:id" component={ViewStudentProfileFromStudent} />
    <Route exact path="/company/:id" component={ViewCompanyProfile} />
    <Route render={() => <Redirect to={{ pathname: '/' }} />} />
  </Switch>
);
//Export The Main Component
export default Main;
