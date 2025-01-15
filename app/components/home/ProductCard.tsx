'use client';
import * as React from 'react';
import {styled, Theme} from '@mui/material/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
} from '@mui/material';
import {red} from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Link from "next/link";

interface ProductCardProps {
    image: string;
    title: string;
    subheader: string;
    price: string;
    description: string;
    link: string;
}

interface ExpandMoreProps {
    expand: string;
    theme?: Theme;
}

// Styled component for ExpandMore icon
const ExpandMore = styled(IconButton)(({theme, expand}: ExpandMoreProps) => ({
    marginLeft: 'auto',
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: theme?.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ProductCard = ({image, title, subheader, price, description, link}: ProductCardProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(prev => !prev);
    };

    return (
        <Card sx={{maxWidth: 380, display: 'flex', flexDirection: 'column', margin: 'auto'}}>
            <CardHeader
                avatar={<Avatar sx={{backgroundColor: red[500]}} aria-label="recipe">S</Avatar>}
                action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
                title={title}
                subheader={subheader}
            />
            <CardMedia component="img" height="194" image={image} alt={title}/>
            <CardContent component={Link} href={link}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {description}
                    {price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to cart">
                    <ShoppingCart/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <ExpandMore
                    expand={expanded.toString()}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{mb: 2}}>Method:</Typography>
                    <Typography sx={{mb: 2}}>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ProductCard;
