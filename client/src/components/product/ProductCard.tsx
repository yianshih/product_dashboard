import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface Props {
  name: string;
  description: string;
  price: number | string;
  deliveryPrice: number | string;
  onClick?: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function ProductCard({
  name,
  description,
  price,
  deliveryPrice,
  onDelete,
  onUpdate,
  onClick,
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
          {onClick && (
            <IconButton onClick={onClick}>
              <ArrowForwardIosIcon color="primary" />
            </IconButton>
          )}
        </Grid>
        <Typography
          variant="subtitle1"
          className={classes.pos}
          color="textSecondary"
        >
          {description}
        </Typography>
        <Grid container direction="row">
          <Typography variant="body2" component="p" className={classes.price}>
            Price : $ {price}
          </Typography>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Typography variant="body2" component="p" className={classes.price}>
            Delivery Price : $ {deliveryPrice}
          </Typography>
        </Grid>
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
