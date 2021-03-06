import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import PositionedSnackbar from './PositionedSnackbar';
import { updatePerson, createPerson } from '../utils/network';
import { dateFromString } from '../utils/date';

const styles = theme => ({
  root: {
    margin: '5px auto',
  },
  form: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '50%',
    margin: '5px auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      birthdate: '',
      cpf: '',
      mask: '999.999.999-99',
      errors: {
        firstName: null,
        lastName: null,
        birthdate: null,
        cpf: null,
      },
      submitted: false,
      snackbar: false,
      edit: false,
    };
  }

  handleSubmit = event => {
    const { firstName, lastName, birthdate, cpf, edit, id } = this.state;
    const { history } = this.props;
    event.preventDefault();

    if (edit) {
      updatePerson({ firstName, lastName, birthdate, cpf, id })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            history.push('/');
          } else if (response.status === 400) {
            response.json().then(json => {
              this.setState({
                submitted: true,
                errors: {
                  [json.errors.field]: json.errors.message,
                },
                snackbar: true,
              });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      createPerson({ firstName, lastName, birthdate, cpf })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            history.push('/');
          } else if (response.status === 400) {
            response.json().then(json => {
              this.setState({
                submitted: true,
                errors: {
                  [json.errors.field]: json.errors.message,
                },
                snackbar: true,
              });
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('personData'));
    if (data) {
      this.setState({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        birthdate: dateFromString(data.birthdate).format('YYYY-MM-DD'),
        edit: true,
      });
      localStorage.removeItem('personData');
    }
  }

  handleChange = (event, prop) => {
    this.setState({ [prop]: event.target.value });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbar: false });
  };

  render() {
    const { classes } = this.props;
    const {
      cpf,
      firstName,
      lastName,
      birthdate,
      submitted,
      snackbar,
      errors,
    } = this.state;
    return (
      <div className={classes.paper}>
        <Typography variant="title" gutterBottom>
          Add new Person
        </Typography>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              error={submitted ? (firstName === '' ? true : false) : false}
              label="First Name"
              id="firstName"
              value={firstName}
              helperText={
                submitted ? (firstName === '' ? 'Empty field!' : ' ') : false
              }
              onChange={event => this.handleChange(event, 'firstName')}
            />
            <TextField
              error={submitted ? (lastName === '' ? true : false) : false}
              helperText={
                submitted ? (lastName === '' ? 'Empty field!' : ' ') : false
              }
              label="Last Name"
              id="lastName"
              value={lastName}
              onChange={event => this.handleChange(event, 'lastName')}
            />
            <TextField
              error={submitted ? (cpf === '' ? true : false) : false}
              helperText={
                submitted ? (cpf === '' ? 'Empty field!' : ' ') : false
              }
              type="number"
              label="CPF"
              id="cpf"
              onChange={event => this.handleChange(event, 'cpf')}
              value={cpf}
            />

            <TextField
              error={submitted ? (birthdate === '' ? true : false) : false}
              helperText={
                submitted ? (birthdate === '' ? 'Empty field!' : ' ') : false
              }
              id="date"
              label="Birthdate"
              type="date"
              value={birthdate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => this.handleChange(event, 'birthdate')}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              className={classes.button}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save
            </Button>
          </form>
        </Paper>
        <PositionedSnackbar
          open={snackbar}
          handleClose={this.handleCloseSnackbar}
          message={errors.cpf}
        />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Person));
