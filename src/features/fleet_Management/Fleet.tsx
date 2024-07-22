import React, { useState,useEffect } from 'react';
import { useGetFleetQuery, useCreateFleetMutation, useUpdateFleetMutation, useDeleteFleetMutation } from './FleetAPI';
import { Toaster, toast } from 'sonner';
import { Tfleet } from './FleetAPI';

const Fleet: React.FC = () => {
  const{data,error,isLoading,isError,refetch}=useGetFleetQuery()
  const [createFleet] = useCreateFleetMutation();
  const [updateFleet] = useUpdateFleetMutation();
  const [deleteFleet,{ data: deleteMsg }] = useDeleteFleetMutation();
  const [editFleetId, setEditFleetId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    vehicle_id:'',
    acquisition_date:'',
    depreciation_rate:'',
    current_value:'',
    maintenance_cost:'',
    status:''
  });
  
  useEffect(() => {
    if (editFleetId !== null) {
      const fleetToEdit = data?.find((fleet: Tfleet) => fleet.fleet_id === editFleetId);
      if (fleetToEdit) {
        setFormData(fleetToEdit);
      }
    } else {
      setFormData({
        vehicle_id:'',
        acquisition_date:'',
        depreciation_rate:'',
        current_value:'',
        maintenance_cost:'',
        status:'',
      });
    }
  }, [editFleetId, data]);

  const handleCreateFleet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFleet(formData).unwrap();
      toast.success('Fleet added successfully');
      setFormData({
        vehicle_id:'',
        acquisition_date:'',
        depreciation_rate:'',
        current_value:'',
        maintenance_cost:'',
        status:''
      });
      refetch();
    } catch (err) {
      toast.error('Failed to add fleet');
    }
  };
  const handleEditFleet = (fleet: Tfleet) => {
    setEditFleetId(fleet.fleet_id);
  };
  const handleUpdateFleet = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editFleetId === null) return;

    try {
      const result = await updateFleet(formData).unwrap();
      console.log('Update result:', result); // Check if the update was successful
      toast.success('User updated successfully');
      setEditFleetId(null);
      refetch(); // Refresh the user list after update
    } catch (err) {
      toast.error('Failed to update fleet');
      console.error('Update fleet error:', err);
    }
  };

  const handleDeleteFleet = async (fleet_id: number) => {
    try {
      await deleteFleet(fleet_id).unwrap();
      toast.success(deleteMsg?.msg || 'Fleet deleted successfully');
      refetch();
    } catch (err) {
      toast.error('Failed to delete fleet');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4 min-h-screen">
        <form onSubmit={editFleetId !== null ? handleUpdateFleet : handleCreateFleet}>
          <div className="mb-2">
            <label htmlFor="vehicle_id" className="block">vehicle_id:</label>
            <input
              id="vehicle_id"
              type="number"
              name="vehicle_id"
              value={formData.vehicle_id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="acquisition_date" className="">acquisition_date:</label>
            <input
              id="acquisition_date"
              type="text"
              name="acquisition_date"
              value={formData.acquisition_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="depreciation_rate" className="">depreciation_rate:</label>
            <input
              id="depreciation_rate"
              type="number"
              name="depreciation_rate"
              value={formData.depreciation_rate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="current_value" className="">current_value:</label>
            <input
              id="current_value"
              type="number"
              name="current_value"
              value={formData.current_value}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor=" maintenance_cost" className=""> maintenance_cost:</label>
            <input
              id="maintenance_cost"
              type="number"
              name="maintenance_cost"
              value={formData.maintenance_cost}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="status" className="">status:</label>
            <input
              id="status"
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button className='btn btn-sm btn-outline btn-success'>{editFleetId !== null ? 'Update fleet' : 'Add fleet'}</button>
        </form>
        <h1 className='text-xl my-4 text-center'>Fleet Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>Vehicle ID</th>
              <th className='text-white'>acquisition_date</th>
              <th className='text-white'>depreciation_rate</th>
              <th className='text-white'>current_value</th>
              <th className='text-white'> maintenance_cost</th>
              <th className='text-white'>status</th>
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
                data && data.map((fleet: Tfleet) => (
                  <tr key={fleet.fleet_id}>
                    {/* <th>{fleet.vehicle.vehicle_id}</th> */}
                    <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="number"
                        value={formData.vehicle_id}
                        name="vehicle_id"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ) : (
                      fleet.vehicle.vehicle_id
                    )}</td>
                    <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="text"
                        value={formData.acquisition_date}
                        name="acquisition_date"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ) : (
                      fleet.acquisition_date
                    )}</td>
                    <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="number"
                        value={formData.depreciation_rate}
                        name="depreciation_rate"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ) : (
                      fleet.depreciation_rate
                    )}</td>
                    <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="number"
                        value={formData.current_value}
                        name="current_value"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ) : (
                      fleet.current_value
                    )}</td>
                    <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="number"
                        value={formData.maintenance_cost}
                        name="maintenance_cost"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ) : (
                      fleet.maintenance_cost
                    )}</td>
                     <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="text"
                        value={formData.status}
                        name="status"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                      />
                    ) : (
                      fleet.status
                    )}</td>
                    <td className="p-2 border-b">
                      {editFleetId === fleet.fleet_id ? (
                        <>
                          <button className='btn btn-sm btn-outline btn-success' onClick={handleUpdateFleet}>Save</button>
                          <button className='btn btn-sm btn-outline btn-warning' onClick={() => setEditFleetId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className='btn btn-sm btn-outline btn-info' onClick={() => handleEditFleet(fleet)}>Edit</button>
                      )}
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDeleteFleet(fleet.fleet_id)}>Delete</button>
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
