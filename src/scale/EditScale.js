import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-scale.js'
import {Redirect} from 'react-router-dom'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

class EditScale extends Component {
  constructor({match}) {
    super()
    this.state = {
      day: '',
      department: '',
      scaleds: '',
      redirectToScale: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    read({
      scaleId: this.match.params.scaleId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({day: new Date(data.day), department: data.department, scaleds: data.scaleds})
      }
    })
  }
  
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const scale = {
      day: this.state.day || undefined,
      department: this.state.department || undefined,
      scaleds: this.state.scaleds || undefined
    }
    update({
      scaleId: this.match.params.scaleId
    }, {
      t: jwt.token
    }, scale).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'scaleId': data._id, 'redirectToScale': true})
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  handleChangeDate = date => {
    this.setState({
      day: date
    });
  };

  render() {
    const {classes} = this.props
    if (this.state.redirectToScale) {
      return (<Redirect to={'/scales'}/>)
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Scale
          </Typography>
          <DatePicker id="day" label="Scale Date" className={classes.textField} dateFormat="dd/MM/yyyy" selected={this.state.day} onChange={this.handleChangeDate} margin="normal"/><br/>
          <TextField id="department" label="Email" className={classes.textField} value={this.state.department} onChange={this.handleChange('department')} margin="normal"/><br/>
          <TextField id="scaleds" label="Scaleds" className={classes.textField} value={this.state.scaleds} onChange={this.handleChange('scaleds')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Save</Button>
        </CardActions>
      </Card>
    )
  }
}

EditScale.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditScale)
