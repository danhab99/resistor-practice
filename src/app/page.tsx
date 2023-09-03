"use client"; // This is a client component

import React, { useState, useCallback, useReducer } from "react";

const backgroundColor = "#9c9459";

const Resistor = ({ colors }: { colors: string[] }) => {
  // Define the SVG dimensions and resistor dimensions
  const svgWidth = 300;
  const svgHeight = 100;
  const resistorWidth = svgWidth - 40;
  const resistorHeight = 40;
  const leadWidth = 30;
  const leadHeight = 30;
  const bulbousRadius = 10; // Adjust the bulbous end radius

  // Calculate the space available for each color band
  const bandWidth = (resistorWidth - 2 * leadWidth) / colors.length;

  return (
    <svg width={svgWidth} height={svgHeight} xmlns="http://www.w3.org/2000/svg">
      {/* Left bulbous end */}
      <ellipse
        cx={(svgWidth - resistorWidth) / 2}
        cy={svgHeight / 2}
        rx={bulbousRadius}
        ry={resistorHeight / 2}
        fill={backgroundColor}
      />

      {/* Right bulbous end */}
      <ellipse
        cx={(svgWidth + resistorWidth) / 2}
        cy={svgHeight / 2}
        rx={bulbousRadius}
        ry={resistorHeight / 2}
        fill={backgroundColor}
      />

      {/* Resistor body */}
      <rect
        x={(svgWidth - resistorWidth) / 2 + bulbousRadius}
        y={(svgHeight - resistorHeight) / 2}
        width={resistorWidth - 2 * bulbousRadius}
        height={resistorHeight}
        fill={backgroundColor}
      />

      {/* Left lead */}
      <rect
        x={(svgWidth + resistorWidth) / 2 - leadWidth}
        y={(svgHeight - leadHeight) / 2}
        width={leadWidth}
        height={leadHeight}
        fill={backgroundColor}
      />

      {/* Right lead */}
      <rect
        x={(svgWidth - resistorWidth) / 2}
        y={(svgHeight - leadHeight) / 2}
        width={leadWidth}
        height={leadHeight}
        fill={backgroundColor}
      />

      {/* Color bands */}
      {colors.map((color, index) => (
        <rect
          key={index}
          x={(svgWidth - resistorWidth) / 1.5 + leadWidth + index * bandWidth}
          y={(svgHeight - resistorHeight) / 2}
          width={bandWidth / 2}
          height={resistorHeight}
          fill={color}
        />
      ))}
    </svg>
  );
};

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

type ChallengeType = {
  numbers: {
    base: number;
    factor: number;
    tolerance: number;
  };
  colors: string[];
};

const ColorMap: Record<string, string> = {
  "0": "black",
  "1": "brown",
  "2": "red",
  "3": "orange",
  "4": "yellow",
  "5": "green",
  "6": "blue",
  "7": "violet",
  "8": "grey",
  "9": "white",
};

const generateChallenge = (_: ChallengeType, __: any): ChallengeType => {
  const base = randomInt(1, 99);
  const factor = randomInt(1, 10);
  const tolerance = randomInt(1, 10);

  var colors: string[] = [];

  const b = base.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  for (let c of b) {
    colors.push(ColorMap[c]);
  }

  colors.push(ColorMap[factor]);
  colors.push(backgroundColor);
  colors.push(ColorMap[tolerance]);

  return {
    numbers: {
      base,
      factor,
      tolerance,
    },
    colors,
  };
};

export default function Home() {
  const [challenge, newChallenge] = useReducer(
    generateChallenge,
    {} as ChallengeType,
    () => generateChallenge({} as ChallengeType, null),
  );

  const [base, setBase] = useState(0);
  const [factor, setFactor] = useState(0);
  const [tolerance, setTolerance] = useState(0);

  const reset = () => {
    newChallenge(null);
    setBase(0);
    setFactor(0);
    setTolerance(0);
  };

  const baseCorrect = challenge.numbers.base == base;
  const factorCorrect = challenge.numbers.factor == factor;
  const toleranceCorrect = challenge.numbers.tolerance == tolerance;

  return (
    <div className="flex flex-col items-center p-8">
      <button onClick={reset}>New Challenge</button>
      {challenge.colors ? <Resistor colors={challenge.colors} /> : null}
      <label>Value (ohms)</label>
      <input
        type="number"
        className="p-2 rounded-full px-4"
        style={{
          backgroundColor: baseCorrect ? "green" : "red",
        }}
        value={base}
        max={99}
        min={0}
        onChange={(e) => setBase(parseInt(e.target.value))}
      />
      <label>Factor</label>
      <input
        type="number"
        className="p-2 rounded-full px-4"
        style={{
          backgroundColor: factorCorrect ? "green" : "red",
        }}
        value={factor}
        max={10}
        min={0}
        onChange={(e) => setFactor(parseInt(e.target.value))}
      />
      <label>Tolerance (%)</label>
      <input
        type="number"
        className="p-2 rounded-full px-4"
        style={{
          backgroundColor: toleranceCorrect ? "green" : "red",
        }}
        value={tolerance}
        max={10}
        min={0}
        onChange={(e) => setTolerance(parseInt(e.target.value))}
      />
      <details className="w-fit">
        <summary className="text-center">Hint</summary>
        <img
          src="https://www.te.com/content/dam/te-com/images/corporate/marketing/global/infographics/resistor-color-code-bands-3-4-1024.png?w=940"
          className="md:w-1/2 mx-auto"
        />
      </details>
    </div>
  );
}
