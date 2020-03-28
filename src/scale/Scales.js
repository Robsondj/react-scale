import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Add from 'material-ui-icons/Add'
import Edit from 'material-ui-icons/Edit'
import Person from 'material-ui-icons/Person'
import Divider from 'material-ui/Divider'
import {Link} from 'react-router-dom'
import {list} from './api-scale.js'
import DeleteScale from './DeleteScale'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 900,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
})

class Scales extends Component {
  state = {
      scales: []
  }

  componentDidMount() {
    this.updateListScale()
  }

  updateListScale = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(this.state);
        this.setState({scales: data})
      }
    })
  }

  render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root} elevation={4}>
        <Link to="/addscale" >
          <IconButton aria-label="Add" color="primary" >
            <Add/>
          </IconButton>
        </Link>
        <Typography type="title" className={classes.title}>
          All Scales
        </Typography>
         {this.state.scales.map((item, i) => {
          return <List dense key={i}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <Person/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.department} secondary={item.scaleds} />
                      <ListItemSecondaryAction>
                        <Link to={"/scale/edit/" + item._id}>
                          <IconButton aria-label="Edit" color="primary">
                            <Edit/>
                          </IconButton>
                        </Link>
                        <DeleteScale scaleId={item._id} updateListScale={this.updateListScale} />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={"Scale date : " + (
                        new Date(item.day)).toDateString()}/>
                    </ListItem>
                    <Divider/>
                 </List>
               })
             } 
      </Paper>
    )
  }
}

Scales.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Scales)
