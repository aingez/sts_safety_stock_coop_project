import React from "react";

function layoutMock({ laneNumber, rowNumber }) {
  // create mock layout of warehouse
  // with antd table to display on editor page
  return (
    <div className="rounded-lg p-5 shadow-lg">
      <table className="border-collapse">
        <tbody>
          <tr>
            <td></td>
            {[...Array(rowNumber)].map((_, rowIndex) => (
              <td
                key={rowIndex}
                className="text-s pb-0 text-center font-light opacity-40"
              >
                {rowIndex + 1}
              </td>
            ))}
          </tr>
          {[...Array(laneNumber)].map((_, laneIndex) => (
            <tr key={laneIndex}>
              <td className="text-s pr-2 align-middle font-light opacity-40">
                {laneIndex + 1}
              </td>
              {[...Array(rowNumber)].map((_, rowIndex) => (
                <td key={rowIndex} className="p-1">
                  <div className="h-10 w-10 rounded-lg bg-amber-400 shadow-lg"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default layoutMock;
