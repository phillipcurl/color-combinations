import { Fragment, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import nightwind from 'nightwind/helper';
import { MoonIcon, SunIcon, CheckIcon } from '@heroicons/react/outline';

import Container from '../../components/container';
import Intro from '../../components/intro';
import Layout from '../../components/layout';
import PaletteCard from '../../components/palette-card';
import Filter from '../../components/filter';
import GeneratedAvatar from '../../components/generated-avatar';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const encodeObjectToQueryParams = (obj: any) =>
  Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const generateRandomString = (length = 6) => {
  return `${Math.random().toString(20).substr(2, length)}`;
};

type IllustrationTypeConfig = {
  variant: 'pixel' | 'bauhaus' | 'ring' | 'sunset' | 'marble';
  style: 'square' | 'circle';
  label: string;
};

// "pixel" | "bauhaus" | "ring" | "beam" | "sunset" | "marble"
const IllustrationTypes: {
  [key: string]: IllustrationTypeConfig;
} = {
  Bauhaus: {
    variant: 'bauhaus',
    style: 'square',
    label: 'Bauhaus',
  },
  Pixel: {
    variant: 'pixel',
    style: 'square',
    label: 'Pixel',
  },
  Ring: {
    variant: 'ring',
    style: 'circle',
    label: 'Ring',
  },
  Sunset: {
    variant: 'sunset',
    style: 'circle',
    label: 'Sunset',
  },
  Marble: {
    variant: 'marble',
    style: 'circle',
    label: 'Marble',
  },
};

const Index = () => {
  const router = useRouter();
  // console.log('router: ', router);
  const { id, limit = 21, skip = 0, numColors } = router.query;
  const skipCount = Number(skip);
  const limitCount = Number(limit);
  console.log('id: ', id);

  const now = new Date(Date.now());
  const today = now.toLocaleDateString();
  const [
    illustrationConfig,
    setIllustrationConfig,
  ] = useState<IllustrationTypeConfig>(IllustrationTypes.Bauhaus);
  const [minColors, setMinColors] = useState(2);
  // const [visibleItems, setVisibleItems] = useState(21);
  // const [skipCount, setSkipCount] = useState(0);
  const [baseString, setBaseString] = useState(today);
  // const { state } = useColor();
  // const { palettes: statefulPalettes } = state;

  const { data, error } = useSWR(id ? `/api/combinations/${id}` : null, fetcher);

  const isLoading = !error && !data;
  const palette = data?.palette || {};

  console.log('data: ', data);

  return (
    <>
      <Layout>
        <Head>
          <title>Color Palettes | Phillip Curl</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>"
          ></link>
        </Head>
        <Container>
          <Intro />
          {/* <div className="mb-8 py-12">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold font-sans">
                  Color Palettes
                </h1>
                <p className="max-w-md text-gray-600">
                  Based on the book, "A Dictionary of Color Combinations" by
                  Sanzo Wada (1883-1967)
                </p>
              </div>
            </div>
          </div> */}
          {isLoading ? (
            <div>loading</div>
          ) : (
            <div className="px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 lg:px-0">
                <div
                  className={
                    illustrationConfig.style === 'square'
                      ? 'aspect-w-4 aspect-h-3'
                      : 'aspect-w-4 aspect-h-4'
                  }
                >
                  <div
                    className="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full z-10 shadow-md"
                    style={{ top: '-1.5rem', left: '-1.5rem' }}
                  >
                    <p className="text-lg font-bold">{palette?.id}</p>
                  </div>
                  <div className="overflow-hidden">
                    <GeneratedAvatar
                      colors={palette.colors.map((pal) => pal.hex)}
                      name={`${palette.colors
                        .map((pal) => pal.name)
                        .join('')}${baseString}`}
                      variant={illustrationConfig.variant}
                      // fixedWidth
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-sans font-bold mb-4">Colors</h2>
                  <div className="space-y-6">
                    {palette.colors.map((color) => {
                      // console.log('color: ', color);
                      // const scale = getScalesFromHex(color.hex);
                      return (
                        <Link href={`/colors/${color?.id}`}>
                          <a className="flex items-start" key={Math.random()}>
                            <div
                              className="w-6 h-6 rounded-full flex-shrink-0 mr-3 mt-1"
                              style={{
                                backgroundColor: color.hslCss,
                              }}
                            ></div>
                            <div className="flex flex-col space-y-1">
                              <div className="inline-flex items-center">
                                <h5 className="font-medium text-lg">
                                  {color.name}
                                </h5>
                              </div>
                              <div className="inline-flex items-center">
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
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                  <pre>{JSON.stringify(palette, null, 2)}</pre>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 px-4 lg:px-0">
                <PaletteCard
                  key={Math.random()}
                  palette={data.palette}
                  style={illustrationConfig.style}
                  variant={illustrationConfig.variant}
                  randomizer={baseString}
                  number={Number(data?.palette?.id)}
                />
              </div>
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Index;
