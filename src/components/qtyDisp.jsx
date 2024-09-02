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
    <div>
      {data.map((item) => (
        <div key={item.type} className="">
          <h3>{item.type}</h3>
          {item.model.map((model) => (
            <button
              key={model.model}
              className="disabled mx-2 my-3 select-none rounded-lg bg-yellow-500 px-6 py-3 text-center align-middle font-sans text-xl font-bold uppercase text-white shadow-lg transition-all"
            >
              {model.model} : {model.qty}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BarChart;
