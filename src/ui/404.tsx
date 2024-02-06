import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from '@mui/material';

interface NotFoundProps {
    hello: () => string;
}

const NotFound: FC<NotFoundProps> = ({ hello }) => {
    useEffect(() => {
        console.log(`${hello()} NotFound`);
    }, [hello]);

    return (
        <Box m={5}>
            <Typography color="red" fontSize="1.5rem" textAlign="center">
                404 - The page is not available
            </Typography>

            <Typography textAlign="center">
                Back to&nbsp;

                <Link to="/posts" style={{textDecoration: "none"}}>
                    POSTS
                </Link>
            </Typography>
        </Box>
    );
}

export default NotFound;

