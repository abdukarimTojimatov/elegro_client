import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SHARINGS } from '../graphql/queries/sharing.query';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

const SharingsList = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_SHARINGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sharings</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.sharings.map((sharing) => (
              <tr key={sharing._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{sharing.sharingDescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sharing.sharingPaymentType}</td>
                <td className="px-6 py-4 whitespace-nowrap">${sharing.sharingAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(sharing.sharingDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/sharings/edit/${sharing._id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SharingsList;