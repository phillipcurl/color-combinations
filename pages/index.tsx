import {
  Fragment,
  // useEffect,
  // useMemo,
  useState,
  // CSSProperties,
  // ReactNode,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import nightwind from 'nightwind/helper';
import {
  MoonIcon,
  SunIcon,
  // ColorSwatchIcon,
  // RefreshIcon,
  CheckIcon,
} from '@heroicons/react/outline';
// import colorsDicts from 'dictionary-of-colour-combinations';

import Container from '../components/container';
import ColorSelect from '../components/color-select';
import CombinationSettingsMenu from '../components/combination-settings-menu';
import Intro from '../components/intro';
import Layout from '../components/layout';
import PaletteCard from '../components/palette-card';
import Filter from '../components/filter';
import GeneratedAvatar from '../components/generated-avatar';
import Post from '../types/post';
import ProjectType from '../types/project';
// import { useColor } from '../lib/color-context';
// import { getHslFromHex, getScalesFromHex } from '../lib/color';
// import useInfiniteScroll from '../lib/useInfiniteScroll';

const fetcher = (input: any, ...args: any) =>
  fetch(input, ...args).then((res) => res.json());

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

type Props = {
  allPosts: Post[];
  allProjects: ProjectType[];
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

const Index = ({ allPosts, allProjects }: Props) => {
  const router = useRouter();
  // console.log('router: ', router);
  const { limit = 21, skip = 0, numColors, colors } = router.query;
  const skipCount = Number(skip);
  const limitCount = Number(limit);

  const now = new Date(Date.now());
  const today = now.toLocaleDateString();
  const [
    illustrationConfig,
    setIllustrationConfig,
  ] = useState<IllustrationTypeConfig>(IllustrationTypes.Bauhaus);
  const [minColors, setMinColors] = useState(2);
  const [selectedColors, setSelectedColors] = useState<string | null>(null);
  // const [visibleItems, setVisibleItems] = useState(21);
  // const [skipCount, setSkipCount] = useState(0);
  const [baseString, setBaseString] = useState(today);
  // const { state } = useColor();
  // const { palettes: statefulPalettes } = state;

  const { data: colorData, error: colorError } = useSWR(
    `/api/colors?${encodeObjectToQueryParams(router.query || {})}`,
    fetcher
  );
  const { data: paletteData, error: paletteError } = useSWR(
    `/api/combinations?${encodeObjectToQueryParams(router.query || {})}`,
    fetcher
  );

  const isLoading = !paletteError && !paletteData;

  console.log('colorData: ', colorData);
  console.log('paletteData: ', paletteData);

  // const formattedPalettes = useMemo(() => {
  //   return statefulPalettes
  //     .map((palette) =>
  //       palette.map((curr) => ({
  //         ...colorsDicts[curr],
  //         hsl: getHslFromHex(colorsDicts[curr].hex),
  //         scale: getScalesFromHex(colorsDicts[curr].hex),
  //       }))
  //     )
  //     .sort(() => Math.random() - 0.5);
  //   // .reverse();
  // }, [statefulPalettes]);

  // const visiblePalettes = useMemo(() => {
  //   return formattedPalettes.filter((pal) => pal.length >= minColors);
  // }, [formattedPalettes, minColors]);

  const handleChangeIllustration = () => {};

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
          <div className="mb-8 py-12">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold font-sans">
                  Color Combinations
                  <small className="text-gray-600 ml-2">
                    ({!isLoading ? paletteData.totalCount || 0 : '...'})
                  </small>
                </h1>
                <p className="max-w-md text-gray-600">
                  Based on the book, "A Dictionary of Color Combinations" by
                  Sanzo Wada (1883-1967)
                </p>
              </div>
              <div className="inline-flex items-center space-x-4">
                <CombinationSettingsMenu />
                <Menu as="div" className="relative inline-block text-left">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="inline-flex items-center font-medium">
                          {/* {illustrationConfig.label} */}
                          Style
                          <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          <div className="p-2">
                            {Object.values(IllustrationTypes).map((type) => (
                              <Menu.Item key={type.label}>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'flex items-center w-full px-4 py-2 text-left'
                                    )}
                                    onClick={() => {
                                      // setVisibleItems(21);
                                      setIllustrationConfig(type);
                                    }}
                                  >
                                    <div className="w-8 h-8 mr-3 flex-shrink-0">
                                      <GeneratedAvatar
                                        colors={paletteData.palettes[0].colors.map(
                                          (pal: any) => pal.hex
                                        )}
                                        name={type.label}
                                        variant={type.variant}
                                        // fixedWidth
                                      />
                                    </div>
                                    <span className="w-full flex-grow-1">
                                      {type.label}
                                    </span>
                                    {type.label ===
                                      illustrationConfig.label && (
                                      <CheckIcon className="h-4 w-4 ml-2 flex-shrink-0" />
                                    )}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                <Filter />
                <ColorSelect
                  onSelect={(val) => {
                    if (val?.id) {
                      router.push(
                        `/?${encodeObjectToQueryParams({
                          ...(router.query || {}),
                          colors: val.id,
                        })}`
                      );
                    }
                  }}
                />
              </div>
              {/* <div>
                
                <button onClick={() => setBaseString(generateRandomString())}>
                  re-draw
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    2 Colors
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    3 Colors
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    4 Colors
                  </button>
                  <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    All
                  </button>
                </span>
                <label htmlFor="">min colors: {minColors}</label>
                <input
                  className="range"
                  type="range"
                  id="minColors"
                  name="minColors"
                  min="2"
                  max="4"
                  step="1"
                  value={minColors}
                  onChange={(e) => {
                    setVisibleItems(21);
                    setMinColors(Number(e?.target?.value));
                  }}
                />
              </div>
             */}
            </div>
          </div>
          {!paletteError && !paletteData ? (
            <div>loading</div>
          ) : (
            <div
              // ref={scrollerRef}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 px-4 lg:px-0"
            >
              {paletteData.palettes.map((palette: any, index: any) => (
                <PaletteCard
                  key={Math.random()}
                  palette={palette}
                  style={illustrationConfig.style}
                  variant={illustrationConfig.variant}
                  randomizer={baseString}
                  number={index + 1 + skipCount}
                />
              ))}
              {/* {hasMore && visiblePalettes.length && (
              <div ref={loaderRef}>Loading…</div>
            )} */}
            </div>
          )}

          <div className="space-y-12 py-10">
            <button
              onClick={() =>
                router.push(
                  `/?${encodeObjectToQueryParams({
                    ...(router.query || {}),
                    skip: skipCount + 21,
                  })}`
                )
              }
              className="w-full flex items-center justify-center px-4 py-3"
            >
              more
            </button>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Index;

// export const getStaticProps = async () => {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//   ]);

//   const allProjects = getAllProjects([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//   ]);

//   return {
//     props: { allPosts, allProjects },
//   };
// };
