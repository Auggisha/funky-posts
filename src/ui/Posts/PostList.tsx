import { FC } from "react";
import { Grid, LinearProgress, Typography, List } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";

import postsStyles from "./PostList.styles";


interface PostsProps {
    posts: any;
}

const PostList: FC<PostsProps> = ({ posts }) => {
    const classes = postsStyles();

    const countPosts = (val: any) => {
        const test = posts.filter((p: any) => p.user.id === val);
        return test.length;

    }

    return (
        <List>

        {posts ? (
            posts.map((post: any) => (
                <Grid container key={post.id} padding={1} className={classes.test} pt={2}>
                        <Grid item xs={3} md={1} display="flex" alignItems="center" justifyContent="center">
                            <FeatherIcon icon="book-open" size="50" strokeWidth="1px"/>
                        </Grid>

                        <Grid 
                            item 
                            xs={9}
                            md={8} 
                            padding={1} 
                            display="flex" 
                            justifyContent="center" 
                            className={classes.postPreview}
                        >
                            <Typography textAlign="left" variant="h6" color="darkBlue">
                            {post.title}
                            </Typography>

                            <Typography textAlign="left">
                                "
                                {post.body}
                                ..." (to full post)
                            </Typography>
                        
                            <Typography textAlign="right" className={classes.commentsInfo}>
                                comments: {post.commentsNo}
                            </Typography>
                        </Grid>

                        <Grid item md={3} textAlign="center" p={1}>
                            <img 
                                src={post.user.avatar} 
                                alt="avatar" 
                                height="90" 
                                width="90"
                                className={classes.avatar}
                            />

                            <Typography fontWeight="bold" margin="5px 0" color="darkBlue">
                                {post.user.name} ({countPosts(post.user.id)})
                            </Typography>

                            <Grid container justifyContent="center" display="flex">

        
                                <Grid item mr={1}>
                                    <Typography fontSize=".9em" className={classes.infoLinks}>          
                                        <Link 
                                            className={classes.noUnderlines}
                                            to={`mailto: ${post.user.email}`}
                                            onClick={(e: any) => {
                                                window.location.href = `mailto: ${post.user.email}`;
                                                e.preventDefault();
                                            }}
                                        >
                                            {post.user.email}
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <FeatherIcon icon="mail" size="22"/>
                                </Grid>
                            </Grid>
        
                            <Grid container justifyContent="center" display="flex">

        
                                <Grid item mr={1}>
                                    <Typography fontSize=".9em" className={classes.infoLinks}>          
                                        <Link
                                            className={classes.noUnderlines}
                                            to={`https://${post.user.website}`}
                                            target="_blank"
                                        >
                                            {post.user.website}
                                        </Link>
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <FeatherIcon icon="home" size="22"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr style={{ width:"50%" }} />
                        
                    </Grid>

            ))
        ) : (
            <span><LinearProgress /></span>
        )}

        </List>
    );
};

export default PostList;
