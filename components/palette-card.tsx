import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
  ReactNode,
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import colorsDicts from 'dictionary-of-colour-combinations';

import GeneratedAvatar, { Variants } from './generated-avatar';
// import { getAllPosts, getAllProjects } from '../../lib/api';
// import Post from '../../types/post';
// import ProjectType from '../../types/project';
// import { useColor } from '../../lib/color-context';
// import { getHslFromHex, getScalesFromHex } from '../../lib/color';
// import useInfiniteScroll from '../../lib/useInfiniteScroll';

type ColorCardProps = {
  palette: Array<{
    hsl: string;
    scale: string[];
    name: string;
    combinations: number[];
    swatch: number;
    cmyk: number[];
    lab: number[];
    rgb: number[];
    hex: string;
  }>;
  number: number;
  style: 'square' | 'circle';
  variant: Variants;
  randomizer: string;
};

const ColorCard = ({
  palette,
  number,
  randomizer,
  style,
  variant,
}: ColorCardProps) => {
  return (
    <Link href={`/combinations/${palette?.id}`}>
      <a className="flex flex-col relative color-card">
        <div
          className="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full z-10 shadow-md"
          style={{ top: '-1.5rem', left: '-1.5rem' }}
        >
          <p className="text-lg font-bold">{palette?.id}</p>
        </div>
        <div
          className={
            style === 'square'
              ? 'aspect-w-4 aspect-h-3'
              : 'aspect-w-4 aspect-h-4'
          }
        >
          <div className={`overflow-hidden ${style === 'circle' && 'p-2'}`}>
            <GeneratedAvatar
              colors={palette.colors.map((pal) => pal.hex)}
              name={`${palette.colors
                .map((pal) => pal.name)
                .join('')}${randomizer}`}
              variant={variant}
              // fixedWidth
            />
          </div>
          <div
            className={`absolute inset-0 flex items-center ${
              style === 'circle' ? 'justify-center' : ''
            } bg-white bg-opacity-50 p-4 color-card-info`}
            style={{ backdropFilter: 'blur(5px)' }}
          >
            <div className="space-y-4">
              {palette.colors.map((color) => {
                // console.log('color: ', color);
                // const scale = getScalesFromHex(color.hex);
                return (
                  <div className="flex items-center" key={Math.random()}>
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0 mr-3"
                      style={{
                        backgroundColor: color.hslCss,
                      }}
                    ></div>
                    <div className="flex flex-col space-y-1">
                      <div className="inline-flex items-center">
                        <h5 className="font-medium">{color.name}</h5>
                      </div>
                      {/* <div className="inline-flex items-center">
                        {color.lightScale.map((val) => (
                          <div
                            key={Math.random()}
                            className="w-4 h-4"
                            style={{
                              backgroundColor: val,
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="inline-flex items-center">
                        {color.darkScale.map((val) => (
                          <div
                            key={Math.random()}
                            className="w-4 h-4"
                            style={{
                              backgroundColor: val,
                            }}
                          ></div>
                        ))}
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-center space-x-4">
            {palette.colors.map((color) => {
              return (
                <div
                  key={`${color.name + Math.random()}`}
                  className="h-6 w-6 rounded-full shadow-sm"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* {color.name} */}
                </div>
              );
            })}
          </div>
          {/* <div className="flex items-center justify-center">
          {palette.map((color) => {
            return (
              <div className="h-6 w-6" style={{ backgroundColor: color.hex }}>
              </div>
            );
          })}
        </div> */}
        </div>
      </a>
    </Link>
  );
};

export default ColorCard;
