import React from 'react';
import { useGetFleetQuery, useDeleteFleetMutation } from './FleetAPI';
import { Toaster, toast } from 'sonner';
import { Tfleet } from './FleetAPI';
const Fleet: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const token = userDetails?.token;
  const { data, error, isLoading, isError } = useGetFleetQuery(undefined, {   headers: {
    'Authorization': `Bearer ${token}`
  }
});
console.log(data)
  const [deletefleet, {  data: deleteMsg }] = useDeleteFleetMutation();

  const handleDelete = async (fleet_id: number) => {
    await deletefleet(fleet_id);
    toast.success(deleteMsg?.msg || 'fleet deleted successfully');
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
        <h1 className='text-xl my-4'>fleet management Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>fleet_id</th>
              <th className='text-white'>acquisition date</th>
              <th className='text-white'>depreciation rate</th>
              <th className='text-white'>current value</th>
              <th className='text-white'>maintenance cost</th>
              <th className='text-white'>status</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
              <th className='text-white'>availability</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
              <th className='text-white'>rental_rate</th>
              <th className='text-white'>vehicle_id</th>
              <th className='text-white'>vehicleSpec_id</th>
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
                data && data.map((fleet:Tfleet, index:number) => (
                  <tr key={index}>
                    <th>{fleet.fleet_id}</th>
                    <td>{fleet.acquisition_date}</td>
                    <td>{fleet.depreciation_rate}</td>
                    <td>{fleet.current_value}</td>
                    <td>{fleet.maintenance_cost}</td>
                    <th>{fleet.status}</th>
                    <td>{fleet.created_at}</td>
                    <td>{fleet.updated_at}</td>
                    <td>{fleet.vehicle.availability}</td>
                    <td>{fleet.vehicle.created_at}</td>
                    <td>{fleet.vehicle.updated_at}</td>
                    <td>{fleet.vehicle.rental_rate}</td>
                    <td>{fleet.vehicle.vehicle_id}</td>
                    <td>{fleet.vehicle.vehicleSpec_id}</td>
                    <td className='flex gap-2'>
                      <button className='btn btn-sm btn-outline btn-info'>update</button>
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(fleet.fleet_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr><td className='text-white' colSpan={6}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Fleet;
