import { useEffect, useState } from "react";
const QuantityDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/current_part/counts",
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { summary, components } = data.data;

  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      {Object.keys(summary).map((key) => (
        <div key={key} className="space-y-2">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
            <button
              // className="relative inline-block overflow-hidden rounded-md py-1 text-center text-sm font-bold uppercase text-green-400 shadow-xl shadow-sky-800 transition-all sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg"
              style={{
                background: "linear-gradient(to right, #6b21a8, #1d4ed8)",
                transform: "skew(-20deg)",
              }}
              className="custom-button-1-red"
            >
              {key} : {summary[key]}
            </button>
            {components[key].map((model) => (
              <button
                key={model.model}
                // className="relative inline-block overflow-hidden rounded-md py-1 text-center text-sm font-bold uppercase text-green-700 shadow-xl shadow-amber-800 transition-all sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3 md:text-lg"
                style={{
                  background: "linear-gradient(to right, #ca8a04, #eab308)",
                  transform: "skew(-20deg)",
                }}
                className="custom-button-1-green"
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
