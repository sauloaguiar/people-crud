import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, Input } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import MaskedInput from 'react-text-mask';
import InputMask from 'react-input-mask';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    width: '30%',
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
      firstName: '',
      lastName: '',
      birthdate: '',
      cpf: '',
      mask: '999.999.999-99',
    };
  }

  handleSubmit = event => {
    const { firstName, lastName, birthdate, cpf } = this.state;
    const { history } = this.props;
    event.preventDefault();

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
      .then(data => {
        console.log(data);
        history.push('/');
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('personData'));
    if (data) {
      this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        birthdate: data.birthdate,
      });
      localStorage.removeItem('personData');
    }
  }

  handleChange = (event, prop) => {
    this.setState({ [prop]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { mask, cpf, firstName, lastName, birthdate } = this.state;
    return (
      <Paper className={classes.paper}>
        <form onSubmit={this.handleSubmit} className={classes.root}>
          <TextField
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={event => this.handleChange(event, 'firstName')}
          />
          <TextField
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={event => this.handleChange(event, 'lastName')}
          />
          <TextField
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
    );
  }
}

export default withRouter(withStyles(styles)(Person));
