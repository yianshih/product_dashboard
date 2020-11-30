import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  name: string;
  description: string;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function ProductOptionCard({
  name,
  description,
  onDelete,
  onUpdate,
}: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Typography className={classes.title} variant="h3">
            {name}
          </Typography>
        </Grid>
        <Typography
          variant="subtitle1"
          className={classes.pos}
          color="textSecondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button
            variant="outlined"
            onClick={onDelete}
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            onClick={onUpdate}
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            style={{ marginLeft: 5 }}
          >
            Edit
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 5,
    background: "#b2ebf2",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  price: {
    //marginLeft: 10,
  },
});
