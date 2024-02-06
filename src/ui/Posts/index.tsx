import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectChangeEvent } from '@mui/material/Select';
import { AvatarGenerator } from 'random-avatar-generator';

import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FeatherIcon from 'feather-icons-react';

import { savePostsList } from "./../../store/postsSlice";
import type { PostDTO } from "../../models/postDTO.model";
import type { UserDTO } from "../../models/userDTO.model";
import type { PostModel } from "./../../models/post.model";
import PostList from "./PostList";

const postsContainerStyles = makeStyles((theme: Theme) => ({
    filterOptionLeft: {
        width: '160px',
        marginLeft: "16px!important"
    },
    filterOptionRight: {
        width: "320px", 
        marginRight: "20px!important"
    },
    icon: {
        cursor: "pointer"
    },
    containerBorder: {
        border: "2px solid #999", 
        borderRadius: "12px", 
        boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
    }
}));

const PostsContainer: FC = () => {
    const classes = postsContainerStyles();
    const postsList = useSelector((state) => (state as any).posts);
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width:800px)');
    const generator = new AvatarGenerator();

    const [posts, setPosts] = useState<PostModel[]>([]);
    const [fetchedPosts, setFetchedPosts] = useState<PostDTO[]>([]);
    const [fetchedUsers, setFetchedUsers] = useState<UserDTO[]>([]);
    const [filterBy, setFilterBy] = useState<string>("username");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [postsInfo, setPostsInfo] = useState<string | null>("");

    const resetFilters = () => {
        setFilterBy("username");
        setSearchTerm("");
        setPosts([...postsList.posts]);
    }

    const handleChangeFilterBy = (event: SelectChangeEvent): void => setFilterBy(event.target.value);
    const saveSearchTermValue = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setSearchTerm(event.target.value);

    const deliverFilteringInfo = () => {
        let filtered: PostModel[] = [];

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

    const fetchAllPosts = async () => await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setFetchedPosts(data));

    const fetchAllUsers = async () => await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setFetchedUsers(data));

    useEffect(() => {
        if (posts.length === 0 && searchTerm === "") 
            setPostsInfo("No Posts to display at this time");
        else if (posts.length === 0 && searchTerm !== "")
            setPostsInfo(`No Posts found with search term "${searchTerm}"`);
        else if (posts.length > 0 && searchTerm === "")
            setPostsInfo(`Viewing all posts (${posts.length} in total)`);
        else 
            setPostsInfo(`Search for "${searchTerm}" in ${filterBy} returned ${posts.length} results`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts]);
  
    useEffect(() => {
      fetchAllPosts();
      fetchAllUsers();
    }, []);
  
    useEffect(() => {
      if (fetchedPosts.length > 0 && fetchedUsers.length > 0) {
        let formatted = [];
        let usersWithAvatar: UserDTO[] = [...fetchedUsers];   

        for (let i = 0; i < fetchedUsers.length; i++)
            usersWithAvatar[i].avatar = generator.generateRandomAvatar();

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
              avatar: usersWithAvatar.find(x => x.id === fetchedPosts[i]!.userId)!.avatar,
            },
            commentsNo: "N/A"
          };

          formatted.push(val);
          dispatch(savePostsList([...formatted]));
          setPosts(formatted);
        }
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedPosts, fetchedUsers, dispatch]);

    return (
        <Grid container pt={6}>
            <Grid  
                item 
                xs={12} 
                md={6} 
                pr={5}
                display="flex"
                alignItems="center"
                justifyContent={matches ? "center" : "flex-end"}
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
                mt={matches ? 5 : 0}
                xs={12} 
                md={6} 
                pr={5}
                display="flex"
                alignItems="center"
                justifyContent={matches ? "center" : "flex-start"}
            >
                <TextField
                    autoFocus
                    inputRef={input => input && input.focus()} 
                    label="Search..."
                    variant="outlined" 
                    onChange={saveSearchTermValue}
                    value={searchTerm}
                    className={classes.filterOptionRight}
                    InputProps={{endAdornment:
                        <Button onClick={() => resetFilters()}>
                            <FeatherIcon 
                                icon="x-circle" 
                                size={searchTerm !== "" ? "32" : "0"} 
                                strokeWidth="1px"
                                className={classes.icon}
                            />
                        </Button> 
                    }}
                />

                <Button
                    variant="contained" 
                    onClick={() => deliverFilteringInfo()}
                    disabled={searchTerm.length < 3}
                >
                    Search
                    
                </Button>
            </Grid>

            <Grid mt={6} mb={3} width="100%">
                <Typography 
                    fontStyle="italic" 
                    letterSpacing="0.05em" 
                    fontWeight="500" 
                    fontSize="1.1em" 
                    textAlign="center"
                >
                    {postsInfo}
                </Typography>
            </Grid>

            <Grid item xs={0} md={2} />

            {posts.length > 0 && (
                <Grid 
                    item 
                    xs={12} 
                    md={8}  
                    p={!matches ? 4 : .5}
                    className={classes.containerBorder} 
                >
                    <PostList posts={posts} />
                </Grid>
            )}
        </Grid>
    );
}

export default PostsContainer;
