import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import {GridListTile, GridListTileBar} from 'material-ui/GridList';

const styles = {

};
class GridTileCR extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {key, src, alt, title, subtitle, actionIcon} = this.props;
        return (
            <GridListTile key={key}>
                <img src={src} alt={alt}/>
                <GridListTileBar
                title={title}
                subtitle={subtitle}
                actionIcon={actionIcon}
                />
            </GridListTile>
        )
    }
}

export default withStyles(styles)(GridTileCR);