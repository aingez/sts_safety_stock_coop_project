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
    <div className="space-y-4 p-4">
      {Object.keys(summary).map((key) => (
        <div key={key} className="space-y-2">
          {/* <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5"> */}
          <div className="flex flex-row space-x-2">
            <div
              className="custom-display-box-1"
              style={{
                background: "linear-gradient(to right, #f59e0b, #fbbf24)",
              }}
            >
              {key} : {summary[key]}
            </div>
            {components[key].map((model) => (
              <div key={model.model} className="custom-display-box-2">
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
