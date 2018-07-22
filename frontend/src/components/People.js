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
  IconButton,
} from '@material-ui/core';
import { FiberNew } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';

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
  newButton: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
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

  handleDelete = person => event => {
    event.preventDefault();
    console.log(person);
  };

  handleEdit = person => event => {
    const { history } = this.props;
    event.preventDefault();
    console.log(person);
    localStorage.setItem('personData', JSON.stringify(person));
    history.push(`/new`);
  };

  renderTable() {
    const { people } = this.state;
    const { classes } = this.props;
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
                  <IconButton
                    className={classes.button}
                    aria-label="Delete"
                    onClick={this.handleDelete(person)}
                  >
                    <Delete />
                  </IconButton>|<IconButton
                    className={classes.button}
                    aria-label="Edit"
                    onClick={this.handleEdit(person)}
                  >
                    <Edit />
                  </IconButton>
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
          <Grid item xs={12} className={classes.newButton}>
            <Button
              type="submit"
              variant="outlined"
              size="small"
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
