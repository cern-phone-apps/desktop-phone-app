import React from 'react';
import { Text, Card } from 'react-native-elements';
import PropTypes from 'prop-types';

const Profile = ({ user }) => {
  return (
    <Card>
      <Text style={{ fontWeight: 'bold' }}>
        {user.firstName} {user.lastName}
      </Text>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      {user.phone && <Text>Phone number: {user.phone}</Text>}
      {user.mobile && <Text>Mobile number: {user.mobile}</Text>}
    </Card>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired
  }).isRequired
};

export default Profile;
