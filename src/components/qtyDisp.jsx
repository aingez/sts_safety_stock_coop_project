const mockData = [
  {
    type: "Block",
    model: [
      { model: "CONV", qty: 200 },
      { model: "HV", qty: 300 },
    ],
    total: 500,
  },
  {
    type: "Head",
    model: [
      { model: "CONV", qty: 300 },
      { model: "HV", qty: 200 },
    ],
    total: 500,
  },
  {
    type: "Crankshaft",
    model: [
      { model: "CONV", qty: 300 },
      { model: "HV", qty: 500 },
    ],
    total: 800,
  },
  {
    type: "Camshaft",
    model: [
      { model: "889F-EX", qty: 100 },
      { model: "889F-IN", qty: 100 },
      { model: "926F-EX", qty: 100 },
      { model: "926F-IN", qty: 100 },
    ],
    total: 400,
  },
];

const BarChart = ({ data = mockData }) => {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.type}>
          <h3 className="custom-box-title-3 flex flex-row">
            {item.type} :{" "}
            <div className="pl-2 text-xl font-bold text-rose-500">
              {item.total}
            </div>
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {item.model.map((model) => (
              <button
                key={model.model}
                className="select-none rounded-lg bg-yellow-500 px-2 py-1 text-center align-middle text-lg font-light uppercase text-black shadow-inner shadow-lg transition-all"
              >
                {model.model} : {model.qty}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
