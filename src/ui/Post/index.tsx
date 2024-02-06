import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import {
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    Typography,
    useMediaQuery
} from '@mui/material';

import type { PostDTO } from "../../models/postDTO.model";
import type { CommentDTO } from "../../models/commentDTO.model";
import type { UserDTO } from "../../models/userDTO.model";
import postStyles from "./Post.styles";

interface PostContainerProps {
    hello: () => string;
};

const PostContainer: FC<PostContainerProps> = ({ hello }) => {
    const classes = postStyles();
    const { id } = useParams();
    const matches = useMediaQuery('(max-width:800px)');

    const [fetchedPost, setFetchedPost] = useState<PostDTO | null>(null);
    const [fetchedComments, setFetchedComments] = useState<CommentDTO[]>([]);
    const [userInfo, setUserInfo] = useState<UserDTO | null>(null);
    const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);

    const fetchPost = async () => await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(data => setFetchedPost(data));

    const fetchComments = async () => await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json())
        .then(data => setFetchedComments(data));

    const fetchUserInfo = async () => await fetch(`https://jsonplaceholder.typicode.com/users/${fetchedPost?.userId}`)
        .then(response => response.json())
        .then(data => setUserInfo(data));

    useEffect(() => {
        if (!id) return;

        fetchPost();
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (fetchedPost?.userId)
            fetchUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedPost]);

    useEffect(() => {
        console.log(`${hello()} Post`);
    }, [hello]);

    if (!fetchedPost || !userInfo) return <CircularProgress />;

    return (
        <Grid 
            container 
            display="flex" 
            justifyContent="center" 
            pt={5}
        >
            <Link to="/posts" className={classes.backToRootLink}>
                Back to posts
            </Link>
            
            <Grid 
                item 
                container 
                xs={12} 
                md={8} 
                p={!matches ? 4 : 0}
                className={classes.postContainer} 
            >
                <Grid item xs={12} pt={4} pl={3} pb={3}>
                    <Typography variant="h5" text-align="center" color="darkBlue">
                        {fetchedPost.title}
                    </Typography>
                
                    <Typography>
                        <i>by </i><b>{userInfo.username}</b> (
                            <a href={`mailto: ${userInfo.email}`}>{userInfo.email}</a>
                        )
                    </Typography>
                </Grid>

                <Grid 
                    item 
                    xs={12} 
                    m={!matches ? 3: 1} 
                    p={!matches ? 2: .5} 
                    className={classes.postBody}
                >
                    <blockquote className={classes.post}>
                        {fetchedPost.body}
                    </blockquote>
                </Grid>

                <Grid item xs={12} pl={3} pt={2}>
                    <Typography>
                        User Comments: {fetchedComments.length} 
                            <Button 
                                onClick={() => setAreCommentsShown(!areCommentsShown)} 
                                className={classes.toggleBtn}
                            >
                                {areCommentsShown ? "hide" : "show"}
                            </Button>
                    </Typography>
                </Grid>

                {areCommentsShown && (
                    <List>
                        {fetchedComments.map((comment, i) => (
                            <ListItem key={comment.id} className={classes.commentsLi}>
                                <Typography color="darkBlue" fontWeight="500" fontSize="1.1em">
                                    {comment.name}
                                </Typography>

                                <Typography>
                                    <q>
                                        {comment.body}
                                    </q>
                                </Typography>
                                
                                <br />
                                
                                <Typography textAlign="right" className={classes.commentFrom}>
                                    from: <span className={classes.commentFromEmail}>{comment.email}</span>
                                </Typography>

                                {i < fetchedComments.length -1 && <Typography fontSize="1.4rem" >* * *</Typography>}
                            </ListItem>
                        ))}    
                    </List>
                )}
            </Grid>
        </Grid>
    );
}

export default PostContainer;
