import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const postListStyles = makeStyles((theme: Theme) => ({
    avatar: {
        border: "2px solid lightGray",
        borderRadius: "4px",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"   
    },
    infoLinks: {
        marginLeft: "8px!important"
    },
    noUnderlines: {
        textDecoration: "none"
    },
    postPreview: {
        flexFlow:"column!important"
    },
    commentsInfo: {
        marginTop: "12px!important"
    },
    test: {
        '&:hover': {
            background: '#DCDCDC',
            cursor: "pointer"
    }
    }
}));

export default postListStyles;
