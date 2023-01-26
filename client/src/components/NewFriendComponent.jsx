
import UserInfo from "./UserInfo"
import AddRemoveFriend from "./AddRemoveFriend"
import FlexBetween from "./FlexBetween"




const NewFriendComponent = ({ id, name, location=null, occupation=null, picturePath, marginAmount="0" }) => {





    return (
        <>
        <FlexBetween>
            <UserInfo 
                userId={id} 
                userImage={picturePath} 
                userName={name} 
                userLocation={location}
                userOccupation={occupation}
            />
            <AddRemoveFriend 
                otherUserId={id}
                allowButton={true}
                marginAmount={marginAmount}
            />
        </FlexBetween>
        </>
    )
}

export default NewFriendComponent;