import React from "react"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PinDropIcon from '@material-ui/icons/PinDrop';

class BwaLocations extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
       return(
        <ListItem button key={this.props.item.id } id={this.props.item.id }  onClick={(event) => this.props.selectLocation(event)} >
            <ListItemIcon> <PinDropIcon/> </ListItemIcon>
            <ListItemText primary={this.props.item.name} />
            <Divider />
        </ListItem>
       
        )
    }
}
export default BwaLocations