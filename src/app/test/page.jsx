import React from "react";

function page() {
  return (
    <div className="bg-rose-600">
      <div className="">
        <label>Row</label>
        <input
          type="number"
          className="custom-text-input-2"
          placeholder="Row Number"
          // value={row}
          // onChange={(e) => setRow(e.target.// value)}
        />
      </div>
      <div className="">
        <label>Lane</label>
        <input
          type="number"
          className="custom-text-input-2"
          placeholder="Lane Number"
          // value={lane}
          // onChange={(e) => setLane(e.target.// value)}
        />
      </div>
      <div className="">
        <label>Pile</label>
        <input
          type="number"
          className="custom-text-input-2"
          placeholder="Pile Number"
          // value={pile}
          // onChange={(e) => setPile(e.target.// value)}
        />
      </div>
      <div className="">
        <label>Layer</label>
        <input
          type="number"
          className="custom-text-input-2"
          placeholder="Layer Number"
          // value={layer}
          // onChange={(e) => setLayer(e.target.// value)}
        />
      </div>
    </div>
  );
}

export default page;
