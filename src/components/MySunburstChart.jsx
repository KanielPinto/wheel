'use client'
import React, { useRef, useEffect, useState } from "react";
import fromKapsule from "react-kapsule";

export default function Chart({ data, amount }) {
  const [ReactSunburst, setReactSunburst] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import("sunburst-chart").then((module) => {
        const SunburstChart = module.default;
        setReactSunburst(fromKapsule(SunburstChart, {
          methodNames: ["focusOnNode"]
        }));
      });
    }
  }, []);

  return (
    <div className="flex font-poppins w-full justify-center items-center self-center">
      {ReactSunburst ? (
        <ReactSunburst
          nodeClassName="style"
          ref={chartRef}
          width={350}
          height={350}
          maxLevels={2}
          excludeRoot
          labelOrientation={"angular"}
          label="name"
          size="value"
          color="color" 
          centerRadius={0.3}
          radiusScaleExponent={1}
          // transitionDuration={800}
          tooltipContent={(d, node) => `${(node.value/100)*amount}`}
          data={data}
          onClick={(node) => {
            chartRef.current.focusOnNode(node);
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
