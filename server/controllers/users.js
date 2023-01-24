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

/* UPDATE */
export const addRemoveFriend = async (req, res) => {

    try {
        const { id, friendId } = req.params;

        // Cannot Add Self As Friend
        if (id === friendId) {
            res.status(405).json({ message: "You cannot add yourself as a friend." });
            return;
        }

        // Finds User and Friend
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
  
        // Remove Friend
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } 

        // Add Friend
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // Wait for MongoDB to update
        await user.save();
        await friend.save();
  
        // Send updated Friends to frontend
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

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
  