import React from 'react'
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

import withAuth from '../withAuth';

const Profile = ({ session }) => {
    console.log(session)
    return (
        <div className="App">
            <UserInfo session={session} />
            <UserRecipes username={session.getCurrentUser.username} />
        </div>
    )
}

export default withAuth(session => session && session.getCurrentUser)(Profile);

