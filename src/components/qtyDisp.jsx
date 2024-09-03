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
          <h3 className="custom-box-title-3 flex flex-row items-center text-base font-medium md:text-lg lg:text-xl">
            {item.type} :
            <span className="pl-2 text-lg font-bold text-rose-500 md:text-xl lg:text-2xl">
              {item.total}
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {item.model.map((model) => (
              <button
                key={model.model}
                className="select-none rounded-lg bg-yellow-500 px-2 py-1 text-center text-sm font-light uppercase text-black shadow-inner transition-all hover:shadow-md sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg"
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
