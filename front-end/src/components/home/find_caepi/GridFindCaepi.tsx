import { Card, Grid } from "@mui/material";
import CardStatusSystem from "../CardStatusSystem";
import { isMobile } from "../../../util/util";
import FindCaepi from "./FindCaepi";


export default function GridFindCaepi() {
    return (
        <Grid id="grid-find-caepi" container direction={isMobile ? "row" : "row-reverse"} 
              className="grid" spacing={{ xs: 1, md: 1}}>
            <Grid item xs={12} md={8}>
                <Card className="card-find-caepi">
                    <FindCaepi />
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardStatusSystem />
            </Grid>
        </Grid>
    );
};
  
