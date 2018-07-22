import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import { FiberNew } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  button: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
  },
});

class People extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [] };
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/people')
      .then(response => response.json())
      .then(data => this.setState({ people: data.data }));
  }

  renderTable() {
    const { people } = this.state;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(person => (
              <TableRow key={person.id}>
                <TableCell component="th" scope="row">
                  {person.firstName}{' '}
                </TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.cpf}</TableCell>
                <TableCell>{person.birthdate}</TableCell>
                <TableCell>
                  <a>Edit</a>|<a>Delete</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            {this.renderTable()}
          </Grid>
          <Grid item xs={12} className={classes.button}>
            <Button
              type="submit"
              variant="outlined"
              size="small"
              className={classes.button}
              component={Link}
              to={'/new'}
            >
              <FiberNew
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Person
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(People);
