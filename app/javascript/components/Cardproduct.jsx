import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NumberFormat from 'react-number-format';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  titlehader: {    /*Le da el largo a la cadena de texto*/
    maxWidth: 200,  
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let existantoffer = '' 
  let originalprice = '' 
  let offerprice = ''
  let calculatedprice = null

  if (props.offer) {
    calculatedprice = ((props.offer * props.price) / 10000).toFixed(2)
    existantoffer = <p style= {{ fontSize:'15px', color:'#3EAB2D'}}>%{props.offer} </p>
    originalprice = <NumberFormat style={{textDecoration:'line-through'}} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} value={props.price} />
    offerprice = <NumberFormat displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} value={calculatedprice} />
  }else{
    originalprice = <NumberFormat displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} value={props.price} />
  }

  return (
    <Card className={classes.root} style={{paddingTop: "0px", height: "300px",width: "200px", }} >
      <CardHeader className={classes.titlehader}
      

        title={
            <Typography gutterBottom variant="subtitle2" component="p">
              {props.name}
            </Typography>
        }   
      
        
        subheader={ <div style={{fontSize:'15px', display: 'flex', justifyContent: 'space-between'}}>{originalprice}{offerprice}{existantoffer}</div>} 
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.name}
      />
     
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      
    </Card>
  );
}
