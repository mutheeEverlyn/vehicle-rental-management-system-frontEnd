import React from 'react';
import { useGetCustomerSupportQuery, useDeleteCustomerSupportMutation } from './CustomerSupportAPI';
import { Toaster, toast } from 'sonner';
import { TcustomerSupport } from './CustomerSupportAPI';
const CustomerSupport: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const token = userDetails?.token;
  const { data, error, isLoading, isError } = useGetCustomerSupportQuery(undefined, {   headers: {
    'Authorization': `Bearer ${token}`
  }
});
  const [deleteCustomerSupport, { data: deleteMsg }] = useDeleteCustomerSupportMutation();

  const handleDelete = async (ticket_id: number) => {
    await deleteCustomerSupport(ticket_id);
    toast.success(deleteMsg?.msg || 'customer support ticket deleted successfully');
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
        <h1 className='text-xl my-4'>customer support tickets Data</h1>
        <table className="table table-xs">
          <thead>
            <tr>
            <th className='text-white'>user_id</th>
              <th className='text-white'>ticket_id</th>
              <th className='text-white'>subject</th>
              <th className='text-white'>description</th>
              <th className='text-white'>status</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
              <th className='text-white'>address</th>
              <th className='text-white'>contact_phone</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>email</th>
              <th className='text-white'>full_name</th>
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
                data && data.map((customerTicket:TcustomerSupport, index:number) => (
                  <tr key={index}>
                     <td>{customerTicket.user_id}</td>
                    <th>{customerTicket.ticket_id}</th>
                    <td>{customerTicket.subject}</td>
                    <td>{customerTicket.description}</td>
                    <td>{customerTicket.status}</td>
                    <td>{customerTicket.created_at}</td>
                    <td>{customerTicket.updated_at}</td>
                    <td>{customerTicket.user.address}</td>
                    <td>{customerTicket.user.contact_phone}</td>
                    <td>{customerTicket.user.created_at}</td>
                    <td>{customerTicket.user.email}</td>
                    <td>{customerTicket.user.full_name}</td>
                    <td>{customerTicket.user.updated_at}</td>
                    <td className='flex gap-2'>
                      <button className='btn btn-sm btn-outline btn-info'>update</button>
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(customerTicket.ticket_id)}>Delete</button>
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

export default CustomerSupport;
