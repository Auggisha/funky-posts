import { FC } from "react";
import {
    Grid,
    LinearProgress,
    Typography,
    List,
    useMediaQuery 
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { Link, useNavigate } from "react-router-dom";

import type { PostModel } from "./../../models/post.model";
import postsStyles from "./PostList.styles";


interface PostsProps {
    posts: PostModel[];
}

const PostList: FC<PostsProps> = ({ posts }) => {
    const classes = postsStyles();
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:600px)');
    const matches2 = useMediaQuery('(max-width:900px)');

    const countPosts = (val: number) => {
        const test = posts.filter((p: PostModel) => p.user.id === val);
        return test.length;
    }

    const navigateToPost = (val: number) => navigate(`/post/${val}`)

    return (
        <List>
            {posts ? (
                posts.map((post: PostModel) => (
                    <Grid 
                        container 
                        key={post.id} 
                        padding={1} 
                        pt={!matches ? 2 :0} 
                        onClick={() => navigateToPost(post.id)}
                        className={classes.test} 
                    >
                        {!matches2 && (
                            <Grid 
                                item 
                                xs={3} 
                                md={1} 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center"
                            >
                                <FeatherIcon icon="book-open" size="50" strokeWidth="1px"/>
                            </Grid>
                        )}

                        <Grid 
                            item 
                            xs={9}
                            md={8} 
                            padding={!matches ? 1 : 0} 
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

                        <Grid item xs={3} md={3} textAlign="center" p={1}>
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
                                            onClick={(e) => {
                                                window.location.href = `mailto: ${post.user.email}`;
                                                e.preventDefault();
                                            }}
                                        >
                                            {post.user.email}
                                        </Link>
                                    </Typography>
                                </Grid>

                                <Grid item>
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
