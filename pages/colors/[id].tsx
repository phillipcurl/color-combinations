import { Fragment, useState } from 'react';
import Head from 'next/head';
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
  const { id } = router.query;
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

  const { data, error } = useSWR(id ? `/api/colors/${id}` : null, fetcher);
  const { data: paletteData, error: paletteError } = useSWR(
    id ? `/api/combinations?colors=${id}` : null,
    fetcher
  );

  const isLoading = !error && !data;
  const isLoadingPalettes = !paletteError && !paletteData;

  const color = data?.color || {};

  console.log('data: ', data);

  return (
    <>
      <Layout>
        <Head>
          <title>Color Palettes | Phillip Curl</title>
          <link
            rel="icon"
            href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22${encodeURIComponent(
              color.hex
            )}%22><path d=%22M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z%22 /></svg>`}
          ></link>
          <meta name="theme-color" content={color.hex}></meta>
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
          {isLoading || isLoadingPalettes ? (
            <div>loading</div>
          ) : (
            <>
              <div className="px-6">
                <div className="lg:flex">
                  <div className="flex-grow">
                    <div
                      className="p-6 border-solid relative flex items-center justify-center"
                      style={{
                        minHeight: '300px',
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
                    </div>
                  </div>
                  <div className="w-full max-w-lg flex-shrink-0 lg:pl-6 pt-16 lg:pt-0">
                    <div className="space-y-6">
                      <div className="inline-flex items-center w-full">
                        {color.lightScale.map((val) => (
                          <div
                            key={Math.random()}
                            className="w-6 h-6"
                            style={{
                              backgroundColor: val,
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="inline-flex items-center w-full">
                        {color.darkScale.map((val) => (
                          <div
                            key={Math.random()}
                            className="w-6 h-6"
                            style={{
                              backgroundColor: val,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-sans font-bold mb-8">
                    Combinations
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
                    {paletteData.palettes.map((palette: any, index: any) => (
                      <PaletteCard
                        key={Math.random()}
                        palette={palette}
                        style={illustrationConfig.style}
                        variant={illustrationConfig.variant}
                        randomizer={baseString}
                        number={Number(data?.palette?.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
            // <div className="px-6">
            //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 lg:px-0">
            //     <div
            //       className={
            //         illustrationConfig.style === 'square'
            //           ? 'aspect-w-4 aspect-h-3'
            //           : 'aspect-w-4 aspect-h-4'
            //       }
            //     >
            //       <div
            //         className="absolute flex items-center justify-center w-12 h-12 bg-white rounded-full z-10 shadow-md"
            //         style={{ top: '-1.5rem', left: '-1.5rem' }}
            //       >
            //         <p className="text-lg font-bold">{palette?.id}</p>
            //       </div>
            //       <div className="overflow-hidden">
            //         <GeneratedAvatar
            //           colors={palette.colors.map((pal) => pal.hex)}
            //           name={`${palette.colors
            //             .map((pal) => pal.name)
            //             .join('')}${baseString}`}
            //           variant={illustrationConfig.variant}
            //           // fixedWidth
            //         />
            //       </div>
            //     </div>
            //     <div>
            //       <h2 className="text-2xl font-sans font-bold mb-4">Colors</h2>
            //       <div className="space-y-6">
            //         {palette.colors.map((color) => {
            //           // console.log('color: ', color);
            //           // const scale = getScalesFromHex(color.hex);
            //           return (
            //             <div className="flex items-start" key={Math.random()}>
            //               <div
            //                 className="w-6 h-6 rounded-full flex-shrink-0 mr-3 mt-1"
            //                 style={{
            //                   backgroundColor: color.hslCss,
            //                 }}
            //               ></div>
            //               <div className="flex flex-col space-y-1">
            //                 <div className="inline-flex items-center">
            //                   <h5 className="font-medium text-lg">
            //                     {color.name}
            //                   </h5>
            //                 </div>
            //                 <div className="inline-flex items-center">
            //                   {color.lightScale.map((val) => (
            //                     <div
            //                       key={Math.random()}
            //                       className="w-4 h-4"
            //                       style={{
            //                         backgroundColor: val,
            //                       }}
            //                     ></div>
            //                   ))}
            //                 </div>
            //                 <div className="inline-flex items-center">
            //                   {color.darkScale.map((val) => (
            //                     <div
            //                       key={Math.random()}
            //                       className="w-4 h-4"
            //                       style={{
            //                         backgroundColor: val,
            //                       }}
            //                     ></div>
            //                   ))}
            //                 </div>
            //               </div>
            //             </div>
            //           );
            //         })}
            //       </div>
            //     </div>
            //   </div>
            //   {/* <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 px-4 lg:px-0">
            //     <PaletteCard
            //       key={Math.random()}
            //       palette={data.palette}
            //       style={illustrationConfig.style}
            //       variant={illustrationConfig.variant}
            //       randomizer={baseString}
            //       number={Number(data?.palette?.id)}
            //     />
            //   </div> */}
            // </div>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Index;
