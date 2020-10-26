import React from "react"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PinDropIcon from '@material-ui/icons/PinDrop';
import GridOnIcon from '@material-ui/icons/GridOn';

class GridSelect extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <ListItem button key="all" id="all" onClick={(event) => this.props.selectLocation(event)} >
                <ListItemIcon> <GridOnIcon /> </ListItemIcon>
                <ListItemText primary="Táblázat nézet" />
                <Divider />
            </ListItem>

        )
    }
}
export default GridSelect