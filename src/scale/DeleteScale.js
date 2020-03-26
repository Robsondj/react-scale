import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import auth from './../auth/auth-helper'
import {remove} from './api-scale.js'
import {Redirect} from 'react-router-dom'

class DeleteScale extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      open: false
    }

  }

  clickButton = () => {
    this.setState({open: true});
    ;
  }

  deleteScale= () => {
    const jwt = auth.isAuthenticated()
    remove({
      scaleId: this.props.scaleId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(`passou em ${this.props.updateListScale}`)
        this.setState({'open': false}, this.props.updateListScale)
      }
    })
  }

  handleRequestClose = () => {
    this.setState({open: false})
  }

  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect push to='/scales'/>
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary" id={this.props.scaleId} >
        <DeleteIcon/>
      </IconButton>

      <Dialog open={this.state.open} onClose={this.handleRequestClose} id={this.props.scaleId} >
        <DialogTitle>{"Delete Scale"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete scale.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteScale} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}

DeleteScale.propTypes = {
  scaleId: PropTypes.string.isRequired
}

export default DeleteScale
