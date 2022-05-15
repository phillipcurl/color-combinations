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
} from '@heroicons/react/outline';
// import colorsDicts from 'dictionary-of-colour-combinations';

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
  const { limit = 20, skip = 0, numColors } = router.query;
  const skipCount = Number(skip);
  const limitCount = Number(limit);

  const now = new Date(Date.now());
  const today = now.toLocaleDateString();
  const [
    illustrationConfig,
    setIllustrationConfig,
  ] = useState<IllustrationTypeConfig>(IllustrationTypes.Bauhaus);
  const [minColors, setMinColors] = useState(2);
  // const [visibleItems, setVisibleItems] = useState(20);
  // const [skipCount, setSkipCount] = useState(0);
  const [baseString, setBaseString] = useState(today);
  // const { state } = useColor();
  // const { palettes: statefulPalettes } = state;

  const { data, error } = useSWR(
    `/api/colors?${encodeObjectToQueryParams(router.query || {})}`,
    fetcher
  );

  const isLoading = !error && !data;

  console.log('data: ', data);

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
                  Colors
                  <small className="text-gray-600 ml-2">
                    ({!isLoading ? data.totalCount || 0 : '...'})
                  </small>
                </h1>
                <p className="max-w-md text-gray-600">
                  Based on the book, "A Dictionary of Color Combinations" by
                  Sanzo Wada (1883-1967)
                </p>
              </div>
            </div>
          </div>
          {!error && !data ? (
            <div>loading</div>
          ) : (
            <div
              // ref={scrollerRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 lg:px-0"
            >
              {data.colors.map((color: any, index: any) => (
                <div
                  className="p-6 border-solid relative"
                  style={{
                    backgroundColor: color.hex,
                    color:
                      color.lightContrast > color.darkContrast
                        ? color.lightScale[0]
                        : color.darkScale[9],
                    // borderColor:
                    //   color.lightContrast > color.darkContrast
                    //     ? color.lightScale[0]
                    //     : color.darkScale[9],
                  }}
                >
                  <div
                    className="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full z-10 shadow-md"
                    style={{ top: '-1.5rem', left: '-1.5rem' }}
                  >
                    <p className="text-lg font-bold">{color.id}</p>
                  </div>
                  <h2 className="text-3xl font-bold text-current">
                    {color.name}
                  </h2>
                  <pre className="overflow-auto text-current max-h-52">
                    {JSON.stringify(color, null, 2)}
                  </pre>
                </div>
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
                  `/colors?${encodeObjectToQueryParams({
                    ...(router.query || {}),
                    skip: skipCount + 20,
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
