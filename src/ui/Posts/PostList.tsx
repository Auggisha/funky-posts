import React, { FC } from "react";
import logo from './logo.svg';
import { Grid, LinearProgress, Typography, Theme } from '@mui/material';
import puppy from './../assets/puppy.jpg';
import puppy2 from './assets/puppey2.jpg';
import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
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
        <>
        {posts ? (
            posts.map((post: any) => (
                <Grid container key={post.id}>
                    <Grid item container xs={12} sm={4} padding={2}>
                        <Grid item md={1} lg={3}/>

                        <Grid item md={10} lg={6}>
                            <img 
                                src={post.user.avatarThumbnail} 
                                alt="avatar" 
                                height="90" 
                                width="90"
                                className={classes.avatar}
                            />

                            <Typography fontWeight="bold" margin="5px 0" color="darkBlue">
                                {post.user.name} ({countPosts(post.user.id)})
                            </Typography>

                            <Grid container>
                                <Grid item>
                                    <FeatherIcon icon="mail" size="22"/>
                                </Grid>
        
                                <Grid item>
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
                            </Grid>
        
                            <Grid container>
                                <Grid item>
                                    <FeatherIcon icon="home" size="22"/>
                                </Grid>
        
                                <Grid item>
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
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid 
                        item 
                        xs={8} 
                        padding={2} 
                        display="flex" 
                        justifyContent="center" 
                        className={classes.postPreview}
                    >
                        <Typography textAlign="left" variant="h5" color="darkBlue">
                         {post.title}
                        </Typography>

                        <Typography textAlign="left">
                            "
                            {post.body}
                            ..." (to full post)
                        </Typography>
                        
                        <Typography textAlign="right" className={classes.commentsInfo}>
                            comments: ({post.commentsNo})
                        </Typography>
                    </Grid>
              </Grid>
            ))
        ) : (
            <span><LinearProgress /></span>
        )}
        </>
    );
};

export default PostList;
