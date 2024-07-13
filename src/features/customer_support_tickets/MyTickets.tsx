import React from 'react';
import { useGetTicketQuery, useDeleteCustomerSupportTicketsMutation,useUpdateTicketMutation } from './TicketApi';
import { Toaster, toast } from 'sonner';
import { Tticket } from './TicketApi';
const MyTickets: React.FC = () => {
  const user_id=parseInt(localStorage.getItem('user_id')|| '0',10);
  const { data, error, isLoading, isError } = useGetTicketQuery(user_id);
  const[updateTicket]=useUpdateTicketMutation();
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
              {/* <th className='text-white'>user_id</th> */}
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
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : (
              isError ? (
                <tr><td colSpan={6}>Error: {error?.data?.message || 'An error occurred'}</td></tr>
              ) : (
                data && data.map((ticket:Tticket, index:number) => (
                  <tr key={index}>
                    <th>{ticket.ticket_id}</th>
                    {/* <td>{ticket.user_id}</td> */}
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
            <tr><td colSpan={6}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyTickets;
