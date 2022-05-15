// import * as React from "react"
import {
  getNumber,
  getUnit,
  getRandomColor,
  getBoolean,
} from '../lib/utilities';

const ELEMENTS = 4;
const SIZE = 80;

function generateColors(name: string, colors: string[]) {
  const numFromName = getNumber(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 1),
    translateY: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 2),
    rotate: getUnit(numFromName * (i + 1), 360),
    isSquare: getBoolean(numFromName, 2),
  }));

  console.log('elementsProperties: ', elementsProperties);

  return elementsProperties;
}

const AvatarBauhaus = (props: any) => {
  const properties = generateColors(props.name, props.colors);

  const sizeProps = props?.fixedWidth
    ? { width: props.size, height: props.size }
    : {};

  return (
    <svg
      viewBox={'0 0 ' + SIZE + ' ' + SIZE}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...sizeProps}
      className="generated-avatar"
      {...props}
    >
      <mask
        id="mask__bauhaus"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={SIZE}
        height={SIZE}
      >
        <rect
          width={SIZE}
          height={SIZE}
          // rx={SIZE / 2}
          fill="#fff"
        />
      </mask>
      <g mask="url(#mask__bauhaus)">
        <rect
          width={SIZE}
          height={SIZE}
          // rx={SIZE / 2}
          fill={properties[0].color}
        />
        <rect
          x={(SIZE - 60) / 2}
          y={(SIZE - 20) / 2}
          width={SIZE}
          height={properties[1].isSquare ? SIZE : SIZE / 8}
          fill={properties[1].color}
          transform={
            'translate(' +
            properties[1].translateX +
            ' ' +
            properties[1].translateY +
            ') rotate(' +
            properties[1].rotate +
            ' ' +
            SIZE / 2 +
            ' ' +
            SIZE / 2 +
            ')'
          }
        />
        {props.colors.length > 2 && (
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            fill={properties[2].color}
            r={SIZE / 5}
            transform={
              'translate(' +
              properties[2].translateX +
              ' ' +
              properties[2].translateY +
              ')'
            }
          />
        )}
        {props.colors.length > 3 && (
          <line
            x1={0}
            y1={SIZE / 2}
            x2={SIZE}
            y2={SIZE / 2}
            strokeWidth={2}
            stroke={properties[3].color}
            transform={
              'translate(' +
              properties[3].translateX +
              ' ' +
              properties[3].translateY +
              ') rotate(' +
              properties[3].rotate +
              ' ' +
              SIZE / 2 +
              ' ' +
              SIZE / 2 +
              ')'
            }
          />
        )}
      </g>
    </svg>
  );
};

export default AvatarBauhaus;
