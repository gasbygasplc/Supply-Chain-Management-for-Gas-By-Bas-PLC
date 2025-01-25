import React from 'react'

const GasRequestList = ({gasRequest}) => {
  return (
    <div className="mt-6">
    <h2 className="text-xl font-bold mb-4">Gas Requests</h2>
    {gasRequest.length > 0 ? (
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 border">Request ID</th>
            <th className="px-4 py-2 border">Token Number</th>
            <th className="px-4 py-2 border">Customer ID</th> 
            <th className="px-4 py-2 border">Gas Type</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Request Date</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {gasRequest.map((request, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 border">{request._id}</td>
              <td className="px-4 py-2 border">{request.tokenNumber}</td>
              <td className="px-4 py-2 border">{request.userId}</td>
              <td className="px-4 py-2 border">{request.gasType}</td>
              <td className="px-4 py-2 border">{request.quantity}</td>
              <td className="px-4 py-2 border">
                {new Date(request.requestedDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No gas requests found.</p>
    )}
  </div>
  )
}

export default GasRequestList