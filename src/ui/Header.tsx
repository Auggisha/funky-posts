import { FC, useEffect } from "react";
import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const headerStyles = makeStyles((theme: Theme) => ({
    fixedHeader: {
        background: 'darkBlue', 
        position: "sticky", 
        top: 0, 
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
        zIndex: 10
    },
    versionInfo: {
        position: "absolute", 
        top: 5, 
        right: 5
    }
}));

interface HeaderProps {
    hello: () => string;
}

const Header: FC<HeaderProps> = ({ hello }) => {
    const classes = headerStyles();

    useEffect(() => {
        console.log(`${hello()} Header`);
    }, [hello]);

    return (
        <Grid padding={4} className={classes.fixedHeader}>
            <Typography 
                variant="h3" 
                fontFamily="roboto" 
                letterSpacing=".25em" 
                fontWeight="600" 
                color= "white"
                textAlign="center"
            >
                FUNKY POSTS
            </Typography>

            <Typography 
                fontFamily="roboto" 
                fontStyle="italic" 
                letterSpacing=".1em" 
                color= "white"
                className={classes.versionInfo}
                >
                    &#169; 2024, version: 0.05
            </Typography>
        </Grid>
    );
}

export default Header;
