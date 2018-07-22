import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '10px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(People);
