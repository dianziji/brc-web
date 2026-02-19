"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { ministryRegions } from "@/data/ministryRegions";

type MinistriesHeroMapProps = {
  className?: string;
};

type RegisterMapPayload = Parameters<typeof echarts.registerMap>[1];

export default function MinistriesHeroMap({ className }: MinistriesHeroMapProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    let chart: echarts.ECharts | null = null;
    const regions = ministryRegions.map((name) => ({
      name,
      itemStyle: {
        areaColor: "#f59e0b",
        borderColor: "#fcd34d",
        borderWidth: 0.8,
      },
      emphasis: {
        itemStyle: { areaColor: "#fbbf24" },
      },
    }));

    const loadMap = async () => {
      const response = await fetch("/maps/world.json");
      const geoJson = await response.json();
      echarts.registerMap("world", geoJson as RegisterMapPayload);

      chart = echarts.init(el);
      chart.setOption({
        backgroundColor: "transparent",
        geo: {
          map: "world",
          roam: false,
          silent: true,
          layoutCenter: ["50%", "55%"],
          layoutSize: "155%",
          itemStyle: {
            areaColor: "#1f2937",
            borderColor: "#475569",
            borderWidth: 0.6,
          },
          emphasis: {
            itemStyle: {
              areaColor: "#334155",
            },
          },
          regions,
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              color: "#f59e0b",
              borderColor: "#fcd34d",
              borderWidth: 1,
            },
            data: [
              { name: "Taiwan", value: [121.0, 23.6] },
              { name: "Hong Kong", value: [114.2, 22.3] },
            { name: "Macau", value: [113.55, 22.2] },
            ],
          },
        ],
      });

      chart.resize();
      requestAnimationFrame(() => chart?.resize());
    };

    loadMap().catch(() => {
      // If map fails to load, we keep the hero empty instead of crashing.
    });

    const handleResize = () => chart?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart?.dispose();
    };
  }, []);

  return <div ref={chartRef} className={className} />;
}
