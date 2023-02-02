import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllUsers } from "state";

import { 
    Box, IconButton, InputBase,
    Typography, Divider, useTheme, useMediaQuery
} from "@mui/material";
import { Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

/**
 * Search Bar Component
 * Search bar looks through all users 
 */
const SearchBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // Color Theme
    const { palette } = useTheme();
    const neutralLight = palette.neutral.light;
    const background = palette.background.default;

    // Search Bar
    const allUsers = useSelector((state) => state.allUsers);
    const [searchUsers, setSearchUsers] = useState(useSelector((state) => state.allUsers));
    const [editSearch, setEditSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [timeOutId, setTimeOutId] = useState(null);

    // Handles Search Bar Blur (fixes issue with search bar popup)
    const onBlurHandler = () => {
        setTimeOutId(setTimeout(() => {
            setIsSearching(false)
        }, 250))
    }

    // If a child receives focus, do not close the popover.
    const onFocusHandler = () => {
        clearTimeout(timeOutId);
    }

    // Search Bar Updates Search Results
    useEffect(() => {
        // Boolean Array (User name starts with search bar input)
        const checkUsers = allUsers.map((user) => {
            let result = (user.name.toLowerCase()).startsWith(editSearch.toLowerCase(), 0);
            return result;
        })

        const searchedUsers = [];
        for (let i = 0; i < checkUsers.length; i++) {
            if (checkUsers[i]) {
                searchedUsers.push(allUsers[i])
            }
        }
        setSearchUsers(searchedUsers)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editSearch]);


    // Gets all users in the database (/users GET API CALL)
    const getAllUsers = async () => {
        await fetch(`http://localhost:3001/users/`, { method: "GET" }
        ).then(async (response) => {
            // Response JSON Object
            const responseJSON = await response.json();

            // Gets all users (sorted alphabetically) for search bar usage
            if (response.status === 200) { 
                const sortedUsers = responseJSON.allUsers.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
                dispatch(setAllUsers(sortedUsers)); 
            }

            // Error Message (Console)
            else { console.error(responseJSON.message); }
        });
    }

    useEffect(() => {
        getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Box onFocus={onFocusHandler} onBlur={onBlurHandler}>
        <FlexBetween backgroundColor={neutralLight} position="relative"
            border={`2px solid ${background}`} borderRadius="9px"
            padding="0.1rem 0rem" paddingLeft="1rem"
            width="150%" maxWidth={isNonMobileScreens ? "20vw" : "90vw"}
        >
            {/* Search Input Bar */}
            <InputBase placeholder="Search..." fullWidth
                onClick={() => setIsSearching(true)} 
                onChange={(e) => setEditSearch(e.target.value)}
                value={editSearch} 
            />

            <IconButton>
                <Search />
            </IconButton>

            {/* Search Popup */}
            {isSearching &&
            <WidgetWrapper position={"absolute"} top={"40px"} left={0} width={"100%"} 
                sx={{ maxHeight: "30vh", overflowY: "auto", paddingTop: "0px", paddingBottom: "0px" }}
            > 
                {searchUsers.length === 0 &&
                    <Typography variant="h5" fontWeight="700"
                        sx={{ fontStyle: "italic", padding: "20px 0px" }}
                    >
                        No Users Found...
                    </Typography>
                }
                {searchUsers.map((u, index) => (
                    
                    <Box key={u._id}>
                    {index !== 0 &&
                        <Divider />
                    }
                    <Box margin="1rem 0rem" 
                        display={"flex"} alignItems={"center"}
                        onClick={() => {
                            navigate(`/profile/${u._id}`);
                            navigate(0);                            // Refresh
                        }}
                        sx={{ cursor: "pointer" }}
                    >
                        <UserImage 
                            userId={u._id} image={u.picturePath} 
                            size={"40px"} allowLink={false} 
                        />
                        <Typography variant="h5" fontWeight="500" marginLeft={"10px"}>
                            {u.name.length > 20 ? `${u.name.substring(0, 20)}...` : u.name}
                        </Typography>
                    </Box>
                    </Box>
                ))}
            </WidgetWrapper>
            }
        </FlexBetween>
        </Box>
        </>
    )
}

export default SearchBar;