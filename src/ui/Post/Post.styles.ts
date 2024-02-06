import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const postStyles = makeStyles((theme: Theme) => ({
    backToRootLink: {
        position: "absolute", 
        right: "50%", 
        marginTop: "16px",
        textDecoration: "none"
    },
    postContainer: {
        border: "2px solid #999", 
        borderRadius: "12px", 
        boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
    },
    postBody: {
        border: "1px solid cornflowerBlue", 
        borderBottomRightRadius: "8px", 
        borderTopLeftRadius: "8px", 
        borderLeft: "none",
        borderRight: "none",
    },
    post: {
        fontFamily: "Roboto",
        fontSize: "1.4rem", 
        letterSpacing: ".065em"
    },
    toggleBtn: {
        margin: "0 0 2px 12px!important"
    },
    commentsLi: {
        flexDirection: "column", 
        alignItems: "baseline", 
        marginBottom: "5px"
    },
    commentFrom :{
        alignSelf: "flex-end"
    },
    commentFromEmail: {
        color: "cornflowerBlue"
    }
}));

export default postStyles;
