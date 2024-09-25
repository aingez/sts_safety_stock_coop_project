// Dev: Aingthawan K.
// Component: to display the overall quantity of each part in total and each model.

import { useEffect, useState } from "react";
const QuantityDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/part/status");
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
    <div className="mt-5 grid grid-cols-2 gap-4">
      {Object.keys(summary).map((key) => (
        <div
          key={key}
          className="rounded-lg border-neutral-900 bg-neutral-300 p-4 shadow-inner dark:border-neutral-200 dark:bg-neutral-700 dark:shadow-lg"
        >
          <div className="mb-2 text-lg font-semibold">
            <div className="rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 text-neutral-800">
              {key} : {summary[key]}
            </div>
          </div>
          <div className="space-y-2">
            {components[key].map((model) => (
              <div
                key={model.model}
                className="rounded-full bg-gradient-to-r from-rose-400 to-yellow-500 py-1 text-center text-neutral-600"
              >
                {model.model} : {model.qty}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuantityDisplay;
