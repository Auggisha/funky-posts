import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectChangeEvent } from '@mui/material/Select';

import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { savePostsList } from "./../../store/postsSlice";
import type { PostDTO } from "./../../models/postsDTO.model";
import type { UserDTO } from "../../models/userDTO.model";
import type { PostModel } from "./../../models/post.model";
import PostList from "./PostList";
import { BasicUserInfoModel } from "../../models/basicUserInfo.model";

const postsContainerStyles = makeStyles((theme: Theme) => ({
    filterOptionLeft: {
        width: '160px',
        marginLeft: "16px!important"
    },
    filterOptionRight: {
        width: "320px", 
        marginRight: "20px!important"
    }
}));

const PostsContainer: FC = () => {
    const classes = postsContainerStyles();
    const postsList = useSelector((state) => (state as any).posts);
    const dispatch = useDispatch();
    console.log("Posts from the local state: ", postsList);

    const [posts, setPosts] = useState<PostModel[]>([]);
    const [fetchedPosts, setFetchedPosts] = useState<PostDTO[]>([]);
    const [fetchedUsers, setFetchedUsers] = useState<UserDTO[]>([]);
    const [filterBy, setFilterBy] = useState<string>("username");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [postsInfo, setPostsInfo] = useState<string | null>("");

    const handleChangeFilterBy = (event: SelectChangeEvent): void => setFilterBy(event.target.value);
    const saveSearchTermValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchTerm(event.target.value);
  

    const deliverFilteringInfo = () => {
        let filtered: PostModel[] = [];
        console.log(postsList);
        console.log(posts);

        switch (filterBy) {
            case "username":
                filtered = 
                    postsList.posts.filter((p: PostModel) => p.user.name.toLocaleLowerCase() === searchTerm.toLocaleLowerCase());
                break;
            case "post-title":
                filtered = 
                    postsList.posts.filter((p: PostModel) => p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
                break;
            default:
                filtered = 
                    postsList.posts.filter((p: PostModel) => p.body.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }
        
        setPosts(filtered);
    }

    const fetchAllPosts = async () => {
      const test = 
        await fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(data => setFetchedPosts(data));
    }

    const fetchAllUsers = async () => {
      const test = 
        await fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => setFetchedUsers(data));
    }

    useEffect(() => {
        if (posts.length === 0 && searchTerm === "") 
            setPostsInfo("No Posts to display at this time");
        else if (posts.length === 0 && searchTerm !== "")
            setPostsInfo(`No Posts found with search term "${searchTerm}"`);
        else if (posts.length > 0 && searchTerm === "")
            setPostsInfo(`Viewing all posts (${posts.length} in total)`);
        else 
            setPostsInfo(`Search for "${searchTerm}" in ${filterBy} returned ${posts.length} results`);
    }, [posts]);
  
    useEffect(() => {
      fetchAllPosts();
      fetchAllUsers();
    }, []);
  
    useEffect(() => {
      if (fetchedPosts.length > 0 && fetchedUsers.length > 0) {
        let formatted = [];

        for (let i = 0; i < fetchedPosts.length; i++) {
          const val = {
            id: fetchedPosts[i].id,
            title: fetchedPosts[i].title,
            body: fetchedPosts[i].body,
            user: {
              id: fetchedPosts[i].userId,
              email: fetchedUsers.find(x => x.id === fetchedPosts[i].userId)!.email,
              website: fetchedUsers.find(x => x.id === fetchedPosts[i].userId)!.website,
              name: fetchedUsers.find(x => x.id === fetchedPosts[i]!.userId)!.username,
              avatar: "https://via.placeholder.com/600/92c952",
              avatarThumbnail: "https://via.placeholder.com/150/92c952"
            },
            commentsNo: "N/A"
          };

          formatted.push(val);
          dispatch(savePostsList([...formatted]));
          setPosts(formatted);
        }
      }
    }, [fetchedPosts, fetchedUsers]);

    return (
        <Grid container pt={6}>
            <Grid  
                item 
                xs={12} 
                md={6} 
                pr={5}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
            >
                <Typography>
                    Filter posts by 
                </Typography>

                <FormControl className={classes.filterOptionLeft} size="small">
                    <Select
                        variant="standard"
                        id="filter-by-select"
                        value={filterBy}
                        onChange={handleChangeFilterBy}
                    >
                        <MenuItem value="username">
                            username
                        </MenuItem>

                        <MenuItem value="post-title">
                            post title
                        </MenuItem>

                        <MenuItem value="post-term">
                            post term
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid                  
                item 
                xs={12} 
                md={6} 
                pr={5}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
            >
                <TextField 
                    label="Search..."
                    variant="outlined" 
                    onChange={saveSearchTermValue}
                    className={classes.filterOptionRight}
                />

                <Button
                    variant="contained" 
                    onClick={() => deliverFilteringInfo()}
                >
                    Search
                </Button>
            </Grid>

            <Grid m={10}>
                <Typography fontStyle="italic" fontWeight="600" fontSize="1.2em" textAlign="right">
                    {postsInfo}
                </Typography>
            </Grid>

            <Grid>
                <PostList posts={posts} />
            </Grid>
        </Grid>
    );
}

export default PostsContainer;
