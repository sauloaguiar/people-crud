import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Input, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import MaskedInput from 'react-text-mask';
import InputMask from 'react-input-mask';
import { withRouter } from 'react-router-dom';
import PositionedSnackbar from './PositionedSnackbar';

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
      fetch(`http://localhost:4000/api/people/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify([
          {
            propName: 'firstName',
            value: firstName,
          },
          { propName: 'lastName', value: lastName },
          { propName: 'cpf', value: cpf },
          { propName: 'birthdate', value: birthdate },
        ]),
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            history.push('/');
          } else if (response.status === 400) {
            response.json().then(json => {
              console.log(json);
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
          // what kind of error would go here?
          console.log(error);
        });
    } else {
      // write validations
      fetch('http://localhost:4000/api/people', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          cpf,
          birthdate,
        }),
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            history.push('/');
          } else if (response.status === 400) {
            response.json().then(json => {
              console.log(json);
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
          // what kind of error would go here?
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
        birthdate: data.birthdate,
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
      mask,
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
              // inputComponent={() => (
              //   <InputMask
              //     mask={mask}
              //     id="cpf"
              //     label="CPF"
              //     value={cpf}
              //     onChange={event => this.handleChange(event, 'cpf')}
              //   />
              // )}
            />

            <TextField
              error={submitted ? (birthdate === '' ? true : false) : false}
              helperText={
                submitted ? (birthdate === '' ? 'Empty field!' : ' ') : false
              }
              id="date"
              label="birth Date"
              type="date"
              value={birthdate}
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
