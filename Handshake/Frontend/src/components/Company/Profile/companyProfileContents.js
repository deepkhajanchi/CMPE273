import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,

  TextField,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    maxWidth: '80%',
    margin: 'auto',
    marginLeft: '15%',
    marginRight: '5%',
    overflow: 'hidden',
  },
  contentWrapper: {
    margin: '30px 30px',
  },
});

function Content(props) {
  const { className, ...rest } = props;
  const {
    classes, state, onUpload,
    onChangeName,
    onChangeLoc,
    onChangeCompanyEmail,
    onChangeCompanyPhone,
    onChangeDescription,
    onSubmit,
  } = props;

  return (  
    <Paper className={classes.paper}>
      <center>
      <div className={classes.contentWrapper}>
      <center>
        <div className={classes.root}>
        <center>
          <Grid
            container spacing={6}>
            <center>
            <Grid xs={14}>
              <center>
              <Card {...rest} className={clsx(classes.root, className)}>
              <center>
                <CardContent>
                <center>
                
                  <div className={classes.details}>
                  <center>
                    <div>
                    <center>
                      <Typography gutterBottom variant="h2" >
                        {state.name}
                      </Typography>
                      <Typography className={classes.locationText} color="textSecondary" variant="body1">
                        {state.loc}
                      </Typography>
                      <br />
                      <Typography className={classes.dateText} color="textSecondary" variant="body1">
                        {state.description}
                      </Typography>
                      </center>
                    </div>
                    </center>
                    <Avatar className={classes.avatar} src={state.profPic}/>
                    
                  </div>
                  </center>
                </CardContent>
                <Divider />
                <CardActions>
                  <left>
                  <Button
                    className={classes.uploadButton}
                    // onClick = {onUpload}
                    color="primary"
                    variant="contained"
                    component="label">
                    Upload picture
                    <input
                      type="file"
                      id="INPUT_TAG"
                      style={{ display: 'none' }}
                      onChange={onUpload}
                      required/>
                  </Button>
                </left>
                </CardActions>
                </center>
              </Card>
              </center>
            </Grid>

            <center>
              <Grid xs={14}>
              <center>
              <Card {...rest} className={clsx(classes.root, className)}>
              <center>
                <form autoComplete="off" noValidate >
                <center>
                  <CardHeader title="Profile"/>
                  <Divider />
                  <center>
                  <CardContent>
                  <center>
                    <Grid container spacing={5}>
                      <Grid item md={8} xs={14} >
                        <TextField fullWidth label="Name" margin="dense" name="name" onChange={onChangeName} required value={state.name} variant="outlined" />
                      </Grid>
                      <Grid item md={8} xs={14}>
                        <TextField
                          fullWidth
                          label="Location"
                          margin="dense"
                          name="location"
                          onChange={onChangeLoc}
                          value={state.loc}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={8}
                        xs={14}
                      >
                        <TextField
                          fullWidth
                          label="Email Address"
                          margin="dense"
                          name="email"
                          onChange={onChangeCompanyEmail}
                          required
                          value={state.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={8}
                        xs={14}
                      >
                        <TextField
                          fullWidth
                          label="Phone Number"
                          margin="dense"
                          name="phone"
                          onChange={onChangeCompanyPhone}
                          type="number"
                          value={state.phone}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={8} xs={14}>
                        <TextField
                          fullWidth
                          label="Description"
                          margin="dense"
                          name="description"
                          multiline
                          rows={15}
                          style={{ width: 300 }}
                          onChange={onChangeDescription}
                                // eslint-disable-next-line react/jsx-sort-props
                          SelectProps={{ native: true }}
                          value={state.description}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      />
                    </Grid>
                    </center>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onSubmit}
                    >
                      Save details
                    </Button>
                  </CardActions>
                  </center>
                  </center>
                </form>
                </center>
              </Card>
              </center>
            </Grid>
            </center>
            </center>
          </Grid>
          </center>
        </div>
        </center>
      </div>
      </center>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.node.isRequired,
  className: PropTypes.node.isRequired,
  state: PropTypes.node.isRequired,
  onUpload: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeLoc: PropTypes.func.isRequired,
  onChangeCompanyEmail: PropTypes.func.isRequired,
  onChangeCompanyPhone: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
