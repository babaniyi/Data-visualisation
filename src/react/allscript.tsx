// -- axis bottom -- //
import { useMemo } from 'react';
import { ScaleLinear } from 'd3';

type AxisBottomProps = {
  xScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  height: number;
  hasGrid: boolean;
};

// tick length
const TICK_LENGTH = 8;

export const AxisBottom = ({
  xScale,
  pixelsPerTick,
  height,
  hasGrid,
}: AxisBottomProps) => {
  const range = xScale.range();

  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  const ticks = xScale.ticks(numberOfTicksTarget).map((value) => ({
    value,
    xOffset: xScale(value),
  }));

  return (
    <>
      <text
        x={width / 2}
        y={50}
        fontStyle={'bold'}
        fontSize={14}
        textAnchor="center"
      >
        Year
      </text>
      <line stroke="black" x2={range[1]} />
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }, i) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={'crispEdges'}
        >
          <line y1={TICK_LENGTH} y2={0} stroke="black" strokeWidth={0.5} />
          {i % 4 === 0 && hasGrid && (
            <line y1={-height} y2={0} stroke="grey" strokeWidth={0.5} />
          )}
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
              fill: 'black',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export const AxisBottomGood = ({
  xScale,
  pixelsPerTick,
  height,
  hasGrid,
}: AxisBottomProps) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }, i) => {
        const isMain = value % 5 === 0;

        return (
          <g
            key={value}
            transform={`translate(${xOffset}, 0)`}
            shapeRendering={'crispEdges'}
          >
            <line
              y1={isMain ? 11 * 2 : 11}
              y2={0}
              stroke={isMain ? 'black' : '#D3D3D3'}
              strokeWidth={0.5}
            />
            {i % 4 === 0 && hasGrid && (
              <line y1={-height} y2={0} stroke="grey" strokeWidth={0.5} />
            )}
            <text
              key={i}
              y={isMain ? 0 : -8}
              x={5}
              style={{
                fontSize: '10px',
                textAnchor: 'start',
                transform: 'translateY(20px)',
                fill: isMain ? 'black' : '#D3D3D3',
              }}
            >
              {isMain ? value : String(value).slice(-2)}
            </text>
          </g>
        );
      })}
    </>
  );
};


// -- axis left -- //

import { useMemo } from 'react';
import { ScaleLinear } from 'd3';

type AxisLeftProps = {
  yScale: ScaleLinear<number, number>;
  pixelsPerTick: number;
  width: number;
};

// tick length
const TICK_LENGTH = 6;

export const AxisLeft = ({ yScale, pixelsPerTick, width }: AxisLeftProps) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={['M', 0, range[0], 'L', 0, range[1]].join(' ')}
        fill="none"
        stroke="currentColor"
      />

      {/* Awis label */}
      <g transform={`translate(${-40}, ${range[0] / 2})`}>
        <text transform="rotate(-90)" fontSize={14} textAnchor="middle">
          Percentage (%)
        </text>
      </g>

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }, i) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <line x2={width} x1={0} stroke="grey" strokeWidth={0.5} />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateX(-20px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export const AxisLeftGood = ({
  yScale,
  pixelsPerTick,
  width,
}: AxisLeftProps) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }, i) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={width} x1={0} stroke="#D3D3D3" strokeWidth={1} />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              alignmentBaseline: 'middle',
              transform: 'translateX(-20px)',
            }}
          >
            {value + '%'}
          </text>
        </g>
      ))}
    </>
  );
};


// LINE CHART -- //
import { useMemo } from 'react';
import * as d3 from 'd3';
import { AxisBottom, AxisBottomGood } from './AxisBottom';
import { AxisLeft, AxisLeftGood } from './AxisLeft';
import { MultiSeries, Series } from './data';
import { cn } from '@/util/utils';

const MARGIN = { top: 120, right: 140, bottom: 100, left: 90 };
const COLORS = [
  '#c23b3b', // End Relationship
  '#1f77b4', // Communicate
  '#2ca02c', // Give Space / Time
  '#ff7f0e', // Set / Respect Boundaries
  '#9467bd', // Seek Therapy
  '#17becf', // Compromise
  '#7f7f7f', // Other
];

type LineChartProps = {
  width: number;
  height: number;
  data: MultiSeries;
  hasSpine: boolean;
  hasLegend: boolean;
  hasHighlight: boolean;
  hasGrid: boolean;
  hasGoodYAxis: boolean;
  hasGoodXAxis: boolean;
  hasGoodAuthorLabel: boolean;
  hasGoodTitleWording: boolean;
  hasGoodTitleAlignment: boolean;
  hasBackground: boolean;
  isLabelOverlapFixed: boolean;
};

export const LineChart = ({
  width,
  height,
  data,
  hasSpine,
  hasLegend,
  hasHighlight,
  hasGrid,
  hasGoodYAxis,
  hasGoodXAxis,
  hasGoodAuthorLabel,
  hasGoodTitleWording,
  hasGoodTitleAlignment,
  hasBackground,
  isLabelOverlapFixed,
}: LineChartProps) => {
  // Convert nested object into list of series
  const allSeries: Series[] = useMemo(() => {
    return Object.entries(data).map(([name, entries]) => {
      const values = Object.entries(entries).map(([year, value]) => ({
        x: Number(year),
        y: value,
      }));
      return { name, values };
    });
  }, [data]);

  // Flatten all data points
  const flat = allSeries.flatMap((s) => s.values);

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // X scale (years)
  const xExtent = d3.extent(flat, (d) => d.x) as [number, number];
  const xScale = useMemo(() => {
    return d3.scaleLinear().domain(xExtent).range([0, boundsWidth]);
  }, [flat, width]);

  // Y scale (percent)
  const yMax = d3.max(flat, (d) => d.y) ?? 0;
  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, yMax]).range([boundsHeight, 0]);
  }, [flat, height]);

  // nudge Scale
  const nudgeScale = d3
    .scaleOrdinal()
    .domain(allSeries.map((s) => s.name))
    .range([0, -2, 8, -3, 4, 7, -3]);

  const opacityScale = d3
    .scaleOrdinal()
    .domain(allSeries.map((s) => s.name))
    .range([1, 1, 0.4, 0.4, 0.4, 0.4, 0.4]);

  // Color palette matching the PNG
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allSeries.map((s) => s.name))
    .range(COLORS);

  // Line generator
  const lineBuilder = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  const allLabels = allSeries.map((s, i) => {
    const last = s.values[s.values.length - 1];
    return (
      <text
        key={i}
        x={boundsWidth + 5}
        y={
          yScale(last.y) +
          (isLabelOverlapFixed ? Number(nudgeScale(s.name)) : 0)
        }
        fontSize={12}
        fill={colorScale(s.name) ?? '#000'}
        alignmentBaseline="central"
        opacity={hasHighlight ? Number(opacityScale(s.name)) : 1}
        className="transition-opacity duration-1000"
      >
        {s.name}
      </text>
    );
  });

  const legend = (
    <g transform={`translate(10, 10)`}>
      {allSeries.map((s, i) => (
        <g key={s.name} transform={`translate(0, ${i * 13})`}>
          <rect width={20} height={10} fill={colorScale(s.name) ?? '#000'} />
          <text x={28} y={10} fontSize={12}>
            {s.name}
          </text>
        </g>
      ))}
    </g>
  );

  const title = (
    <g>
      <text
        x={hasGoodTitleAlignment ? MARGIN.left : MARGIN.left + 8}
        y={hasGoodTitleAlignment ? MARGIN.top - 60 : MARGIN.top - 40}
        fontSize={hasGoodTitleAlignment ? 22 : 16}
        color="black"
        fontWeight="bold"
      >
        {hasGoodTitleWording
          ? 'You should just end your relationship!'
          : '15 Years of Reddit Relationship Advice (1,166,592 comments)'}
      </text>
      <text
        x={hasGoodTitleAlignment ? MARGIN.left : MARGIN.left + 15}
        y={hasGoodTitleAlignment ? MARGIN.top - 30 : MARGIN.top - 12}
        fontSize={hasGoodTitleAlignment ? 14 : 10}
        color="grey"
      >
        {hasGoodTitleWording
          ? 'What 52M comments from r/relationship_advice tell us about rel. advice over 15y.'
          : 'Data Source: r/relationship_advice (5,012,500 posts, 52,685,657 comments) filtered for quality'}
      </text>
    </g>
  );

  const authorAnnotation = hasGoodAuthorLabel ? (
    <text x={0} y={boundsHeight + 50} fontSize={10} textAnchor="start">
      Created by ui/GeargeDaGreat123
    </text>
  ) : (
    <text x={boundsWidth - 2} y={14} fontSize={10} textAnchor="end">
      created by ui/GeargeDaGreat123
    </text>
  );

  const getOpacityClass = (bol: boolean) => {
    return cn(
      'transition-opacity duration-1000',
      bol ? 'opacity-100' : 'opacity-0'
    );
  };

  const allLines = allSeries.map((s) => {
    const path = lineBuilder(s.values);
    if (!path) return null;
    return (
      <path
        key={s.name}
        d={path}
        fill="none"
        stroke={colorScale(s.name) ?? '#000'}
        strokeWidth={2}
        opacity={hasHighlight ? Number(opacityScale(s.name)) : 1}
        className="transition-opacity duration-1000"
      />
    );
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      <g className={getOpacityClass(hasBackground)}>
        <rect width={width} height={height} fill="#f9f9ff" />
      </g>

      {title}

      {/* Axes + grid + author annotation */}
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        <g className={getOpacityClass(hasGoodYAxis)}>
          <AxisLeftGood
            yScale={yScale}
            pixelsPerTick={100}
            width={boundsWidth}
          />
        </g>
        <g className={getOpacityClass(!hasGoodYAxis)}>
          <AxisLeft yScale={yScale} pixelsPerTick={30} width={boundsWidth} />
        </g>
      </g>

      <g transform={`translate(${MARGIN.left}, ${MARGIN.top + boundsHeight})`}>
        <g className={getOpacityClass(hasGoodXAxis)}>
          <AxisBottomGood
            xScale={xScale}
            pixelsPerTick={40}
            height={boundsHeight}
            hasGrid={hasGrid}
          />
        </g>
        <g className={getOpacityClass(!hasGoodXAxis)}>
          <AxisBottom
            xScale={xScale}
            pixelsPerTick={30}
            height={boundsHeight}
            hasGrid={hasGrid}
          />
        </g>
      </g>

      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {allLines}

        {/* Legend (simple) */}
        <g className={getOpacityClass(hasLegend)}>{legend}</g>
        <g className={getOpacityClass(!hasLegend)}>{allLabels}</g>
      </g>

      {/* Spine */}
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <g className={getOpacityClass(hasSpine)}>
          <rect
            width={boundsWidth}
            height={boundsHeight}
            stroke={'black'}
            opacity={1}
            fill="none"
          />
        </g>
      </g>

      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {authorAnnotation}
      </g>
    </svg>
  );
};

// LINE CHART BASIC DEMO
import { data } from "./data";
import { LineChart } from "./LineChart";

export const LineChartBasicDemo = ({ width = 700, height = 400 }) => (
  <LineChart data={data} width={width} height={height} />
);

// DATA
export type MultiSeries = Record<string, Record<string, number>>;

export type Series = {
    name: string;
    values: { x: number; y: number }[];
};

export const data = {
    "End Relationship": {
        "2010": 31,
        "2011": 33,
        "2012": 34,
        "2013": 32,
        "2014": 35,
        "2015": 37,
        "2016": 39,
        "2017": 41,
        "2018": 40,
        "2019": 38,
        "2020": 39,
        "2021": 40,
        "2022": 42,
        "2023": 46,
        "2024": 49,
        "2025": 50
    },
    "Communicate": {
        "2010": 25,
        "2011": 24,
        "2012": 23,
        "2013": 22,
        "2014": 21,
        "2015": 21,
        "2016": 20,
        "2017": 19,
        "2018": 19,
        "2019": 18,
        "2020": 18,
        "2021": 17,
        "2022": 16,
        "2023": 15,
        "2024": 14,
        "2025": 13
    },
    "Give Space / Time": {
        "2010": 19,
        "2011": 18,
        "2012": 18,
        "2013": 17,
        "2014": 17,
        "2015": 17,
        "2016": 16,
        "2017": 16,
        "2018": 15,
        "2019": 15,
        "2020": 15,
        "2021": 15,
        "2022": 14,
        "2023": 13,
        "2024": 12,
        "2025": 11
    },
    "Set / Respect Boundar.": {
        "2010": 12,
        "2011": 12,
        "2012": 11,
        "2013": 11,
        "2014": 12,
        "2015": 12,
        "2016": 12,
        "2017": 12,
        "2018": 12,
        "2019": 13,
        "2020": 13,
        "2021": 13,
        "2022": 14,
        "2023": 14,
        "2024": 15,
        "2025": 15
    },
    "Seek Therapy": {
        "2010": 6,
        "2011": 6,
        "2012": 6,
        "2013": 7,
        "2014": 7,
        "2015": 7,
        "2016": 8,
        "2017": 8,
        "2018": 9,
        "2019": 9,
        "2020": 10,
        "2021": 10,
        "2022": 10,
        "2023": 11,
        "2024": 11,
        "2025": 11
    },
    "Compromise": {
        "2010": 7,
        "2011": 7,
        "2012": 7,
        "2013": 6,
        "2014": 6,
        "2015": 6,
        "2016": 6,
        "2017": 6,
        "2018": 6,
        "2019": 5,
        "2020": 5,
        "2021": 5,
        "2022": 4,
        "2023": 4,
        "2024": 4,
        "2025": 4
    },
    "Other": {
        "2010": 3,
        "2011": 2,
        "2012": 3.5,
        "2013": 2,
        "2014": 3,
        "2015": 3.5,
        "2016": 3,
        "2017": 4,
        "2018": 4,
        "2019": 3,
        "2020": 2,
        "2021": 2,
        "2022": 3,
        "2023": 3,
        "2024": 4,
        "2025": 5
    }
}

// Tiny deterministic RNG
function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function addQuarterlyNoise(
    data: MultiSeries,
    noiseAmount = 1,
    seed = 1
): MultiSeries {
    const rand = mulberry32(seed);
    const newData: MultiSeries = {};

    for (const seriesName in data) {
        const series = data[seriesName];
        const points: [number, number][] = [];

        for (const yearStr in series) {
            const year = parseFloat(yearStr);
            const value = series[yearStr];

            points.push([year, value]);

            if (yearStr.includes('.')) continue;

            // Add quarters
            for (let q = 0.25; q < 1; q += 0.25) {
                const quarterYear = year + q;
                const noisyValue =
                    value + (rand() * noiseAmount * 2 - noiseAmount);
                points.push([
                    parseFloat(quarterYear.toFixed(2)),
                    parseFloat(noisyValue.toFixed(2)),
                ]);
            }
        }

        // Sort
        points.sort((a, b) => a[0] - b[0]);

        // Build object
        const obj: Record<string, number> = {};
        for (const [year, value] of points) {
            obj[year.toFixed(2)] = value;
        }

        newData[seriesName] = obj;
    }

    return newData;
}

// INDEX.TS
import ReactDOM from "react-dom";
import { data } from "./data/";
import { LineChart } from "./LineChart";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <LineChart data={data} width={400} height={400} />,
  rootElement
);

// PACKAGE.JSON
{
    "name": "pie-chart-basic",
    "version": "1.0.0",
    "description": "",
    "keywords": [],
    "main": "index.js",
    "dependencies": {
      "d3": "7.1.1",
      "react": "17.0.2",
      "react-dom": "17.0.2",
      "react-scripts": "4.0.0"
    },
    "devDependencies": {
      "@babel/runtime": "7.13.8",
      "typescript": "4.1.3"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    },
    "browserslist": [
      ">0.2%",
      "not dead",
      "not ie <= 11",
      "not op_mini all"
    ]
  }