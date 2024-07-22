import React, { useState, useEffect } from 'react';
import { useGetFleetQuery, useCreateFleetMutation, useUpdateFleetMutation, useDeleteFleetMutation } from './FleetAPI';
import { Toaster, toast } from 'sonner';
import { Tfleet } from './FleetAPI';

const Fleet: React.FC = () => {
  const { data, error, isLoading, isError, refetch } = useGetFleetQuery();
  const [createFleet] = useCreateFleetMutation();
  const [updateFleet] = useUpdateFleetMutation();
  const [deleteFleet, { data: deleteMsg }] = useDeleteFleetMutation();
  const [editFleetId, setEditFleetId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    vehicle_id: '',
    acquisition_date: '',
    depreciation_rate: '',
    current_value: '',
    maintenance_cost: '',
    status: ''
  });

  useEffect(() => {
    if (editFleetId !== null) {
      const fleetToEdit = data?.find((fleet: Tfleet) => fleet.fleet_id === editFleetId);
      if (fleetToEdit) {
        setFormData({
          vehicle_id: fleetToEdit.vehicle.vehicle_id.toString(), // Ensure it's a string for the input
          acquisition_date: fleetToEdit.acquisition_date,
          depreciation_rate: fleetToEdit.depreciation_rate.toString(), // Ensure it's a string for the input
          current_value: fleetToEdit.current_value.toString(), // Ensure it's a string for the input
          maintenance_cost: fleetToEdit.maintenance_cost.toString(), // Ensure it's a string for the input
          status: fleetToEdit.status,
        });
      }
    } else {
      setFormData({
        vehicle_id: '',
        acquisition_date: '',
        depreciation_rate: '',
        current_value: '',
        maintenance_cost: '',
        status: ''
      });
    }
  }, [editFleetId, data]);

  const handleCreateFleet = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert vehicle_id and other number fields to numbers
    const dataToSend = {
      ...formData,
      vehicle_id: Number(formData.vehicle_id),
      depreciation_rate: Number(formData.depreciation_rate),
      current_value: Number(formData.current_value),
      maintenance_cost: Number(formData.maintenance_cost),
    };

    try {
      await createFleet(dataToSend).unwrap();
      toast.success('Fleet added successfully');
      setFormData({
        vehicle_id: '',
        acquisition_date: '',
        depreciation_rate: '',
        current_value: '',
        maintenance_cost: '',
        status: ''
      });
      refetch();
    } catch (err) {
      toast.error('Failed to add fleet');
      console.error('Create fleet error:', err);
    }
  };

  const handleEditFleet = (fleet: Tfleet) => {
    setEditFleetId(fleet.fleet_id);
  };

  const handleUpdateFleet = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editFleetId === null) return;

    // Exclude vehicle_id from update payload and convert remaining fields to numbers
    const { vehicle_id, ...updateData } = formData;
    const dataToSend = {
      ...updateData,
      depreciation_rate: Number(updateData.depreciation_rate),
      current_value: Number(updateData.current_value),
      maintenance_cost: Number(updateData.maintenance_cost),
    };

    try {
      const result = await updateFleet({ fleet_id: editFleetId, ...dataToSend }).unwrap();
      console.log('Update result:', result);
      toast.success('Fleet updated successfully');
      setEditFleetId(null);
      refetch();
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
            <label htmlFor="vehicle_id" className="block">Vehicle ID:</label>
            <input
              id="vehicle_id"
              type="number"
              name="vehicle_id"
              value={formData.vehicle_id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              disabled={editFleetId !== null} // Disable if editing
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="acquisition_date" className="">Acquisition Date:</label>
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
            <label htmlFor="depreciation_rate" className="">Depreciation Rate:</label>
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
            <label htmlFor="current_value" className="">Current Value:</label>
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
            <label htmlFor="maintenance_cost" className="">Maintenance Cost:</label>
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
            <label htmlFor="status" className="">Status:</label>
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
          <button className='btn btn-sm btn-outline btn-success'>
            {editFleetId !== null ? 'Update Fleet' : 'Add Fleet'}
          </button>
        </form>
        <h1 className='text-xl my-4 text-center'>Fleet Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>Vehicle ID</th>
              <th className='text-white'>Acquisition Date</th>
              <th className='text-white'>Depreciation Rate</th>
              <th className='text-white'>Current Value</th>
              <th className='text-white'>Maintenance Cost</th>
              <th className='text-white'>Status</th>
              <th className='text-white'>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={7}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((fleet: Tfleet) => (
                  <tr key={fleet.fleet_id}>
                    <td>{editFleetId === fleet.fleet_id ? (
                      <input
                        type="number"
                        value={formData.vehicle_id}
                        name="vehicle_id"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        disabled
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
            <tr><td className='text-white' colSpan={7}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Fleet;
