import React from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../users_management/UsersApi';
import { Toaster, toast } from 'sonner';
export interface Tuser{
  user_id:number;
  full_name:string;
  email:string;
  contact_phone:string;
  address:string;
  role:string;
}
const UsersTable: React.FC = () => {
  const { data, error, isLoading, isError } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting, data: deleteMsg }] = useDeleteUserMutation();

  const handleDelete = async (user_id: number) => {
    await deleteUser(user_id);
    toast.success(deleteMsg?.msg || 'User deleted successfully');
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto  bg-gray-800 text-white rounded-lg p-4">
        <h1 className='text-xl my-4'>Users Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>user_id</th>
              <th className='text-white'>full_name</th>
              <th className='text-white'>email</th>
              <th className='text-white'>phone</th>
              <th className='text-white'>address</th>
              <th className='text-white'>role</th>
              <th className='text-white'>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={6}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((user:Tuser, index:number) => (
                  <tr key={index}>
                    <th>{user.user_id}</th>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact_phone}</td>
                    <td>{user.address}</td>
                    <td>{user.role}</td>
                    <td className='flex gap-2'>
                      <button className='btn btn-sm btn-outline btn-info'>update</button>
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(user.user_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={6}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
