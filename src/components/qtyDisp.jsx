import { useEffect, useState } from "react";

const QuantityDisplay = () => {
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1440);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STS_SAFETY_STOCK_FAST_API}/part/status`,
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { summary, components } = data.data || { summary: {}, components: {} };

  if (
    Object.keys(summary).length === 0 &&
    Object.keys(components).length === 0
  ) {
    return <div>No data available</div>;
  }

  return (
    // <div className={`mt-5 flex gap-4 ${isMobile ? "flex-row" : "flex-col"}`}>
    <div
      className={`mt-5 flex gap-2 ${isMobile ? "flex-row overflow-scroll" : "flex-col"}`}
    >
      {Object.keys(summary).map((key) => (
        <div
          key={key}
          className="rounded-lg border-neutral-900 bg-neutral-300 p-4 shadow-inner dark:border-neutral-200 dark:bg-neutral-700 dark:shadow-lg"
        >
          <div className="mb-2 flex flex-row justify-between gap-5 whitespace-nowrap rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-2 text-lg font-semibold text-neutral-800 shadow-inner shadow-amber-200">
            <div className="uppercase text-red-600">{key}</div>
            {summary[key]}
          </div>
          <div className="space-y-2">
            {components[key].map((model) => (
              <div
                key={model.model}
                className="flex flex-row justify-between rounded-md bg-yellow-600 px-3 py-1 text-center text-neutral-800"
              >
                <div className="uppercase">{model.model}</div>
                {model.qty}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuantityDisplay;
