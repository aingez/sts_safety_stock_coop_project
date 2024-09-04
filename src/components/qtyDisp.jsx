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

const QuantityDisplay = ({ data = mockData }) => {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      {data.map((item) => (
        <div key={item.type} className="space-y-2">
          {/* <h3 className="custom-box-title-3 flex flex-row items-center text-base font-medium italic md:text-lg lg:text-xl">
            </h3> */}
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
            <button
              key={item.type}
              className="relative inline-block overflow-hidden rounded-md py-1 text-center text-sm font-bold uppercase text-green-400 shadow-xl shadow-sky-800 transition-all sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg"
              style={{
                background: "linear-gradient(to right, #6b21a8, #1d4ed8)",
                transform: "skew(-20deg)",
              }}
            >
              {item.type} : {item.total}
            </button>
            {item.model.map((model) => (
              <button
                key={model.model}
                className="relative inline-block overflow-hidden rounded-md py-1 text-center text-sm font-bold uppercase text-green-700 shadow-xl shadow-amber-800 transition-all sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg"
                style={{
                  background: "linear-gradient(to right, #ca8a04, #eab308)",
                  transform: "skew(-20deg)",
                }}
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

export default QuantityDisplay;
