import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        // Returns User Object
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        // Returns User Friends
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        )
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        const formattedUsers = allUsers.map(
            ({ _id, firstName, lastName, picturePath }) => {
                return { 
                    _id: _id,
                    name: `${firstName} ${lastName}`,
                    picturePath: picturePath,
                };
            }
        )
        
        // Returns All Users Object
        res.status(200).json(formattedUsers);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {

    try {
        const { id, otherId } = req.params;

        // Cannot Add Self As Friend
        if (id === otherId) {
            res.status(405).json({ message: "You cannot add yourself as a friend." });
            return;
        }

        // Finds User and Friend
        const user = await User.findById(id);
        const otherUser = await User.findById(otherId);
  
        // Remove Friend
        if (user.friends.includes(otherId)) {
            user.friends = user.friends.filter((id) => id !== otherId);
            otherUser.friends = otherUser.friends.filter((friendId) => friendId !== id);
        } 

        // Add Friend
        else {
            user.friends.push(otherId);
            otherUser.friends.push(id);
        }

        // Wait for MongoDB to update
        await user.save();
        await otherUser.save();

        // Get 'user's friends list' and the 'friend's friends list'
        const userFriends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const otherUserFriends = await Promise.all(
            otherUser.friends.map((id) => User.findById(id))
        );
  
        // Formet both Friends List
        const formatUserFriends = userFriends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        const formatOtherUserFriends = otherUserFriends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json({ 
            loggedInUserFriends: formatUserFriends, 
            otherUserFriends: formatOtherUserFriends 
        });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateUserInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            firstName, lastName,
            location, occupation,
            twitterHandle, linkedInHandle,
        
        } = req.body;

        console.log(req.body)

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { 
                firstName: firstName,
                lastName: lastName,
                location: location,
                occupation: occupation,
                twitterHandle: twitterHandle, 
                linkedInHandle: linkedInHandle 
            },
            { new: true } // returns the new document
        );

        res.status(200).json(updatedUser);
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
  