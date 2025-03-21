import React, { useContext, useState } from 'react'
import { OutletContext } from '../../Context/OutletContext';
import { assets } from '../../assets/assets';
import jsPDF from 'jspdf';
import "jspdf-autotable"

const OutletReport = () => {

  //============================================= download Report =================================================

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Outlet Report", 14, 15);

    if(navbutton === "Stock Report" && Array.isArray(outletStock) && outletStock.length > 0)
    {
      doc.setFontSize(12);
      doc.text("Stock Report", 14, 25);

      doc.autoTable({
        startY: 30,
        head: [["Gas Type", "Current Stock", "Max Capacity"]],
        body: outletStock.map((item) => [item.gasType, item.currentStock, item.maxCapacity]),
      })
      
    }

    if (navbutton === "Gas Request" && Array.isArray(allGasReq) && allGasReq.length > 0) {
      doc.setFontSize(12);
      doc.text("Total Gas Request Report", 14, 25);
  
      doc.autoTable({
        startY: 30,
        head: [["Request ID", "User Name", "Requested Date", "Status"]],
        body: allGasReq.map((request) => [
          request.requestId,
          request.userId?.name || "N/A",
          new Date(request.requestedDate).toLocaleDateString(),
          request.status,
        ]),
      });
    }

    doc.save(`${navbutton}.pdf`); 
  }

  const [navbutton , setNavButton] = useState('Stock Report');

  const {outletStock , allGasReq} = useContext(OutletContext);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="text-gray-700 text-base">

        <div className='w-full flex flex-col gap-6 mx-auto border py-6 px-6 rounded'>

          <div className="flex w-full flex-col items-center gap-4 md:items-start md:gap-5">

            <h1 className='font-semibold text-2xl md:text-3xl'>
              <span className='text-primary-700'>Outlet Report</span> Section
            </h1>

            <div className='flex w-full flex-col justify-center items-center md:flex-row gap-4 bg-gray-100 py-1 px-1.5 rounded-e-lg md:rounded-full'>
              <button type="button" className={navbutton === 'Stock Report' ? "bg-white w-full md:w-fit py-[10px] px-[18px] text-[15px] text-primary-700 rounded-[100px]" : "bg-transparent py-[10px] px-[18px] text-[15px] text-gray-800"}  onClick={() => setNavButton('Stock Report')}>
                Stock Report
              </button>

              <button  type="button" className={navbutton === 'Gas Request' ? "bg-white w-full md:w-fit py-[10px] px-[18px] text-[15px] text-primary-700 rounded-[100px]" : "bg-transparent py-[10px] px-[18px] text-[15px] text-gray-800"} onClick={() => setNavButton('Gas Request')}>
                Total Gas Request
              </button>

            </div>

            <div className='w-full'>
              
              {
                navbutton === 'Stock Report' && Array.isArray(outletStock) && outletStock.length > 0 && (
                  <div className="text-gray-700 text-base mt-6 rounded-md py-6 md:px-6 bg-white border">

                  <div className="flex items-center justify-between bg-white p-4 rounded-md">

                    <h1 className="font-semibold text-xl md:text-2xl text-gray-800">Current Stock Report</h1>

                    <div onClick={downloadPDF} className="bg-white hover:border-primary-600 transition p-2 rounded-md cursor-pointer flex items-center justify-center border border-gray-300 shadow-sm">

                      <img src={assets.download} alt="Download" className="w-6 h-6" />

                    </div>

                  </div>


                  <div className="overflow-x-auto max-w-full">

                    <table className="min-w-full table-auto text-sm text-gray-700">

                      <thead className="bg-gray-100">

                        <tr>

                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Gas Type</th>
                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Current Stock</th>
                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Max Capacity</th>

                        </tr>

                      </thead>

                      <tbody>
                        {outletStock.map((stockItem) => (
                          <tr key={stockItem.gasType} className="border-t">
                            <td className="px-4 py-2 whitespace-nowrap">{stockItem.gasType}</td>
                            <td className="px-4 py-2 whitespace-nowrap font-semibold">{stockItem.currentStock}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{stockItem.maxCapacity}</td>
                          </tr>
                        ))}
                      </tbody>

                    </table>

                  </div>

                </div>

                )
              }
              {
                navbutton === 'Gas Request' && Array.isArray(allGasReq) && allGasReq.length > 0 && (
                  <div className="text-gray-700 text-base mt-6 rounded-md py-6 md:px-6 bg-white border">

                  <div className="flex items-center justify-between bg-white p-4 rounded-md">

                    <h1 className="font-semibold text-xl md:text-2xl text-gray-800">Total Gas Request Report</h1>

                    <div onClick={downloadPDF} className="bg-white hover:border-primary-600 transition p-2 rounded-md cursor-pointer flex items-center justify-center border border-gray-300 shadow-sm">

                      <img src={assets.download} alt="Download" className="w-6 h-6" />

                    </div>

                  </div>

                  <div className="overflow-x-auto max-w-full">

                    <table className="min-w-full table-auto text-sm text-gray-700">

                      <thead className="bg-gray-100">

                        <tr>
                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Request ID</th>
                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">User Name</th>
                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Requested Date</th>
                          <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Status</th>
                        </tr>

                      </thead>

                      <tbody>

                        {allGasReq.map((request) => (
                          <tr key={request._id} className="border-t">
                            <td className="px-4 py-2 whitespace-nowrap">{request.requestId}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{request.userId?.name || 'N/A'}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{new Date(request.requestedDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{request.status}</td>
                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

                )
              }
              
            </div>

          </div>

        </div>
        
      </form>
    </>
  )
}

export default OutletReport