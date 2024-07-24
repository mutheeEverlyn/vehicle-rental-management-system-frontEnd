import React, { useState } from "react";
import { useCreateCustomerSupportTicketsMutation} from "./TicketApi";
import { Toaster, toast } from 'sonner';
// import { Tticket } from "./TicketApi";

const NewTicket: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No data.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const [createTicket] = useCreateCustomerSupportTicketsMutation();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket = {
      user_id: user_id,
      subject,
      description,
      status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await createTicket(newTicket).unwrap();
      toast.success('Ticket created successfully');
      setSubject('');
      setDescription('');
      setStatus('');
    } catch (error) {
      toast.error('Failed to create ticket');
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
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4 min-h-screen">
        <h1 className='text-xl my-4'>Create ticket</h1>
        <form onSubmit={handleCreateTicket} className="mb-4">
          <div className="mb-2">
            <label htmlFor="subject" className="block">Subject:</label>
            <input
              id="subject"
              type="text"
              value={subject}
              placeholder="eg.vehicle/payment"
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
            <label htmlFor="status" className="block">Status:</label>
            <textarea
              id="status"
              value={status}
              placeholder="complaint/compliment"
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Ticket</button>
        </form>
      </div>
    </>
  )
};

export default NewTicket;
