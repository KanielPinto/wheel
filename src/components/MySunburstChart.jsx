'use client'
import React, { useRef, useEffect, useState } from "react";
import fromKapsule from "react-kapsule";
import { useMediaQuery } from '@react-hook/media-query';

export default function Chart({ data, amount }) {
  const [ReactSunburst, setReactSunburst] = useState(null);
  const chartRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust the breakpoint as needed

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

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (chartRef.current) {
          chartRef.current.width = width;
          chartRef.current.height = height;
        }
      }
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        resizeObserver.unobserve(chartRef.current);
      }
    };
  }, []);

  const chartSize = isMobile ? 280 : 350; // Adjust the size for mobile devices

  return (
    <div className="flex font-poppins w-full justify-center items-center self-center" style={{ maxWidth: '100%', height: 'auto' }}>
      {ReactSunburst ? (
        <ReactSunburst
          nodeClassName="style"
          ref={chartRef}
          width={chartSize} // Adjusted size
          height={chartSize} // Adjusted size
          maxLevels={2}
          excludeRoot
          labelOrientation={"angular"}
          label="name"
          size="value"
          color="color"
          centerRadius={0.3}
          radiusScaleExponent={1}
          tooltipContent={(d, node) => `${(node.value / 100) * amount}`}
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
