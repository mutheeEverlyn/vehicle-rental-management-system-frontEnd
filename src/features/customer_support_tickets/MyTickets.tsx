import React, { useState } from 'react';
import { useGetCustomerSupportTicketsQuery, useUpdateCustomerSupportTicketsMutation } from './TicketApi';
import { Toaster, toast } from 'sonner';
import { Tticket } from './TicketApi';

const MyTickets: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data: Tickets, error, isLoading, isError } = useGetCustomerSupportTicketsQuery();
  const [updateTicket] = useUpdateCustomerSupportTicketsMutation();

  const [editTicketId, setEditTicketId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    status: '',
  });

  const handleEdit = (ticket: Tticket) => {
    setEditTicketId(ticket.ticket_id);
    setFormData({
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
    });
  };

  const handleUpdate = async (ticket_id: number) => {
    const updateTicketData = {
      ...formData,
      updated_at: new Date().toISOString(),
    };
    try {
      await updateTicket({ ticket_id, ...updateTicketData }).unwrap();
      toast.success('Ticket updated successfully');
      setEditTicketId(null);
    } catch (err) {
      toast.error('Failed to update ticket');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const MyTickets = Tickets?.filter((Ticket: Tticket) => Ticket.user_id === user_id);

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
        <h1 className="text-xl my-4">My tickets</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">subject</th>
              <th className="text-white">description</th>
              <th className="text-white">status</th>
              <th className="text-white">created_at</th>
              <th className="text-white">updated_at</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8}>Error: {error?.data?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              MyTickets?.map((Ticket: Tticket) => (
                <tr key={Ticket.ticket_id}>
                  <td>
                    {editTicketId === Ticket.ticket_id ? (
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input input-sm text-black"
                      />
                    ) : (
                      Ticket.subject
                    )}
                  </td>
                  <td>
                    {editTicketId === Ticket.ticket_id ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-sm text-black"
                      />
                    ) : (
                      Ticket.description
                    )}
                  </td>
                  <td>
                    {editTicketId === Ticket.ticket_id ? (
                      <input
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input input-sm text-black"
                      />
                    ) : (
                      Ticket.status
                    )}
                  </td>
                  <td>{Ticket.created_at}</td>
                  <td>{Ticket.updated_at}</td>
                  <td className="flex gap-2">
                    {editTicketId === Ticket.ticket_id ? (
                      <>
                        <button
                          className="btn btn-sm btn-outline btn-success"
                          onClick={() => handleUpdate(Ticket.ticket_id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-warning"
                          onClick={() => setEditTicketId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline btn-info"
                        onClick={() => handleEdit(Ticket)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-white" colSpan={8}>
                {MyTickets ? `${MyTickets.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default MyTickets;
