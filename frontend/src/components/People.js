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
import { loadPeople, deletePerson } from '../utils/network';
import StringMask from 'string-mask';
import moment from 'moment';

const calculateAge = date => {
  const now = moment();
  const birthdate = moment(date, 'YYYY-MM-DD HH:mm Z');
  return Math.round(moment.duration(now.diff(birthdate)).asYears());
};

const cpfMask = '000.000.000-00';

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
    this.loadPeopleData();
  }

  loadPeopleData = () => {
    loadPeople()
      .then(response => response.json())
      .then(data => {
        this.setState({ people: data.data });
      });
  };

  handleDelete = person => event => {
    event.preventDefault();

    deletePerson(person.id)
      .then(_ => {
        this.loadPeopleData();
      })
      .catch(err => console.log(err));
  };

  handleEdit = person => event => {
    const { history } = this.props;
    event.preventDefault();
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
                <TableCell>
                  {new StringMask(cpfMask).apply(person.cpf)}
                </TableCell>
                <TableCell>{calculateAge(person.birthdate)}</TableCell>
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
