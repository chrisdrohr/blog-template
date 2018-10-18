import React from "react";
import PropTypes from "prop-types";
import { GridList } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { scrollbarSelector, mask } from "../Constants";
import classnames from "classnames";

const styles = {
    root: {
        minWidth: "100%",
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden",
        margin: "0px !important"
    },
    reverse: {
        flexDirection: "row-reverse"
    },
    gridList: {
        // padding: 8,
        width: "100%",
        [scrollbarSelector.track]: {
            backgroundColor: "transparent"
        },
        [scrollbarSelector.thumb]: {
            backgroundColor: "transparent"
        },

        transform: "translateZ(0)"
    },
    scrollX: {
        overflowX: "scroll"
    },
    scrollY: {
        overflowY: "scroll"
    },
    noWrap: {
        flexWrap: "nowrap"
    },
    mask: mask
};
const GridListCR = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <GridList
                cellHeight={'auto'}
                cols={props.cols}
                rows={props.rows}
                spacing={props.spacing}
                classes={{
                    root: classnames({
                        [classes.gridList]: true,
                        [classes.mask]: props.mask,
                        [classes.noWrap]: props.noWrap,
                        [classes.reverse]: props.reverse,
                        [classes.scrollX]: props.scroll === "x",
                        [classes.scrollY]: props.scroll === "y"
                    })
                }}
            >
                {props.children}
            </GridList>
        </div>
    );
};

GridListCR.propTypes = {
    classes: PropTypes.object,
    mask: PropTypes.bool,
    noWrap: PropTypes.bool,
    reverse: PropTypes.bool,
    scroll: PropTypes.string,
};

export default withStyles(styles)(GridListCR);
