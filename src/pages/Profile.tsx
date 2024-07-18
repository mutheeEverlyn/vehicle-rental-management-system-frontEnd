import React from 'react';
import { useGetUserByIdQuery } from '../features/users_management/UsersApi';

const Profile: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');

  if (!userDetails) {
    return <div>Error: No user is logged in.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;

  console.log('User Details:', parsedUserDetails);
  console.log('User ID:', user_id);

  if (!user_id) {
    return <div>Error: No user is logged in.</div>;
  }

  const { data, error, isLoading } = useGetUserByIdQuery(user_id);

  console.log(data); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="mx-auto w-11/12 md:w-3/4 lg:w-1/2 min-h-screen">
      <div className="updateBox">
        <div className="bg-blue-400 w-full h-18 rounded-t-lg">
          <h3 className="text-white py-4 px-4 text-lg">MY PROFILE</h3>
        </div>

        {data && (
          <div>
            <div className="p-8 text-left">
              <div className="bg-gray-700 rounded mb-4 p-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg text-white mb-0">Name: {data.full_name}</h4>
                </div>
              </div>

              <div className="bg-gray-700 rounded mb-4 p-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg text-white mb-0">Email: {data.email}</h4>
                </div>
              </div>

              <div className="bg-gray-700 rounded mb-4 p-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg text-white mb-0">Address: {data.address}</h4>
                </div>
              </div>

              <div className="bg-gray-700 rounded mb-4 p-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg text-white mb-0">Contact Phone: {data.contact_phone}</h4>
                </div>
              </div>

              <div className="bg-gray-700 rounded mb-4 p-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg text-white mb-0">Password: ********</h4>
                </div>
              </div>

              {/* <button className="customizedButton updateProfileButton bg-blue-500 text-white py-2 px-4 rounded">
                Update Profile
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
