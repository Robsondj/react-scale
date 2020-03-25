import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {create} from './api-scale.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import {Link} from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
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

class AddScale extends Component {
  state = {
      day: '',
      department: '',
      scaleds: '',
      open: false,
      error: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const scale = {
      day: this.state.day || undefined,
      department: this.state.department || undefined,
      scaleds: this.state.scaleds || undefined
    }
    create({
      t: jwt.token
    }, scale).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
      }
    })
  }

  render() {
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Add Scale
          </Typography>
          <TextField id="day" label="Day" className={classes.textField} value={this.state.day} onChange={this.handleChange('day')} margin="normal"/><br/>
          <TextField id="department" type="department" label="Department" className={classes.textField} value={this.state.department} onChange={this.handleChange('department')} margin="normal"/><br/>
          <TextField id="scaleds" type="scaleds" label="Scaleds" className={classes.textField} value={this.state.scaleds} onChange={this.handleChange('scaleds')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Save</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>New Scale</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New scale successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/scales">
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Save
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>)
  }
}

AddScale.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddScale)
