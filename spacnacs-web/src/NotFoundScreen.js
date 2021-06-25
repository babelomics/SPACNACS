import React from "react";
import Grid from "@material-ui/core/Grid";

const NotFoundScreen = props => (
    <React.Fragment>
        <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={10} md={6} lg={4}>
                <div className="glitch" data-text="404">
                    404
                </div>
                <h2>Page not found</h2>
            </Grid>
        </Grid>
    </React.Fragment>
);

export default NotFoundScreen;
