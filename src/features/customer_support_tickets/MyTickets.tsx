import React from 'react';
import { useGetCustomerSupportTicketsByIdQuery, useDeleteCustomerSupportTicketsMutation,useUpdateCustomerSupportTicketsMutation } from './TicketApi';
import { Toaster, toast } from 'sonner';
import { Tticket } from './TicketApi';
const MyTickets: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data, error, isLoading, isError } = useGetCustomerSupportTicketsByIdQuery(user_id);
  const[updateTicket]=useUpdateCustomerSupportTicketsMutation();
  const [deleteTicket, {  data: deleteMsg }] = useDeleteCustomerSupportTicketsMutation();
  const handleUpdate=(ticket_id:number)=>{
    const updateTicketData={
      ticket_status:'ticket updated',
    };
    updateTicket({ticket_id,...updateTicketData})
  }
  const handleDelete = async (ticket_id: number) => {
    await deleteTicket(ticket_id);
    toast.success(deleteMsg?.msg || 'ticket deleted successfully');
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
        <h1 className='text-xl my-4'>My tickets</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className='text-white'>ticket_id</th>
              <th className='text-white'>user_id</th>
              <th className='text-white'>subject</th>
              <th className='text-white'>description</th>
              <th className='text-white'>status</th>
              <th className='text-white'>created_at</th>
              <th className='text-white'>updated_at</th>
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
                data && data.map((ticket:Tticket, index:number) => (
                  <tr key={index}>
                    <td>{ticket.ticket_id}</td>
                    <td>{ticket.user_id}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.description}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.created_at}</td>
                    <td>{ticket.updated_at}</td>
                    <td className='flex gap-2'>
                      <button className='btn btn-sm btn-outline btn-info' onClick={()=>handleUpdate(ticket.ticket_id)}>update</button>
                      <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(ticket.ticket_id)}>Delete</button>
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

export default MyTickets;
