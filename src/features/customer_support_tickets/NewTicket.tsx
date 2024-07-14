import React, { useState } from "react";
import { useCreateCustomerSupportTicketsMutation, useUpdateCustomerSupportTicketsMutation, useGetCustomerSupportTicketsQuery } from "./TicketApi";
import { Toaster, toast } from 'sonner';
import { Tticket } from "./TicketApi";

const NewTicket: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data, error, isLoading, isError } = useGetCustomerSupportTicketsQuery();
  const [updateTicket] = useUpdateCustomerSupportTicketsMutation();
  const [createTicket] = useCreateCustomerSupportTicketsMutation(user_id);

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket = {
      user_id: parseInt(localStorage.getItem('user_id') || '0', 10),
      subject,
      description,
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
       createTicket(newTicket).unwrap();
       console.log(localStorage)
      console.log(newTicket)
      console.log(data)
      toast.success('Ticket created successfully');
      setSubject('');
      setDescription('');
      setStatus('');
    } catch (error) {
      toast.error('Failed to create ticket');
    }
  };

  const handleUpdate = async (ticket_id: number) => {
    const updateTicketData = {
      ticket_status: 'ticket updated',
    };
    try {
      await updateTicket({ ticket_id, ...updateTicketData }).unwrap();
      toast.success('Ticket updated successfully');
    } catch (error) {
      toast.error('Failed to update ticket');
    }
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
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4">
        <h1 className='text-xl my-4'>My tickets</h1>
        <form onSubmit={handleCreateTicket} className="mb-4">
          <div className="mb-2">
            <label htmlFor="subject" className="block">Subject:</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block">status:</label>
            <textarea
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Ticket</button>
        </form>
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
                data && data.map((ticket: Tticket, index: number) => (
                  <tr key={index}>
                    <th>{ticket.ticket_id}</th>
                    <th>{ticket.user_id}</th>
                    <td>{ticket.subject}</td>
                    <td>{ticket.description}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.created_at}</td>
                    <td>{ticket.updated_at}</td>
                    <td className='flex gap-2'>
                      <button className='btn btn-sm btn-outline btn-info' onClick={() => handleUpdate(ticket.ticket_id)}>Update</button>
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
  )
};

export default NewTicket;
