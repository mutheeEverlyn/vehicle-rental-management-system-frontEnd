import React from 'react';
import { useGetLocationQuery, useDeleteLocationMutation } from './LocationApi';
import { Toaster, toast } from 'sonner';
export interface Tlocation{
  location_id:number;
  name:string;
  address:string;
  contact_phone:string;
  created_at:string;
  updated_at:string
}
const Location: React.FC = () => {
  const { data, error, isLoading, isError } = useGetLocationQuery();
  const [deleteLocation, { isLoading: isDeleting, data: deleteMsg }] = useDeleteLocationMutation();

  const handleDelete = async (location_id: number) => {
    await deleteLocation(location_id);
    toast.success(deleteMsg?.msg || 'location deleted successfully');
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
        <h1 className='text-xl my-4'>Location and branches Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>location_id</th>
              <th className='text-white'>name</th>
              <th className='text-white'>address</th>
              <th className='text-white'>contact_phone</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
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
                data && data.map((location:Tlocation, index:number) => (
                  <tr key={index}>
                    <th>{location.location_id}</th>
                    <td>{location.name}</td>
                    <td>{location.address}</td>
                    <td>{location.contact_phone}</td>
                    <td>{location.address}</td>
                    <td>{location.created_at}</td>
                    <td>{location.updated_at}</td>
                    <td className='flex gap-2'>
                      <button className='btn btn-sm btn-outline btn-info'>update</button>
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(location.location_id)}>Delete</button>
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

export default Location;
