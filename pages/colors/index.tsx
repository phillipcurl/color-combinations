import {
  // useEffect,
  // useMemo,
  useState,
  // CSSProperties,
  // ReactNode,
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
// import colorsDicts from 'dictionary-of-colour-combinations';

import Container from '../../components/container';
import Intro from '../../components/intro';
import Layout from '../../components/layout';

const fetcher = (input: any, ...args: any) =>
  fetch(input, ...args).then((res) => res.json());

const encodeObjectToQueryParams = (obj: any) =>
  Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

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
  const { limit = 20, skip = 0 } = router.query;
  const skipCount = Number(skip);

  const now = new Date(Date.now());
  const today = now.toLocaleDateString();
  const [,] = useState<IllustrationTypeConfig>(IllustrationTypes.Bauhaus);
  const [] = useState(2);
  const [] = useState(today);

  const { data, error } = useSWR(
    `/api/colors?${encodeObjectToQueryParams(router.query || {})}`,
    fetcher
  );

  const isLoading = !error && !data;

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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 px-4 lg:px-0"
            >
              {data.colors.map((color: any) => (
                <Link href={`/colors/${color?.id}`}>
                  <div
                    className="p-6 border-solid relative space-y-6 cursor-pointer"
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
                      {color.darkScale.slice(1).map((val) => (
                        <div
                          key={Math.random()}
                          className="w-6 h-6"
                          style={{
                            backgroundColor: val,
                          }}
                        ></div>
                      ))}
                    </div>
                    <h2 className="font-bold text-current">
                      {color?.combinations?.length || 0} combinations
                    </h2>
                    {/* <pre className="overflow-auto text-current max-h-52">
                      {JSON.stringify(color, null, 2)}
                    </pre> */}
                  </div>
                </Link>
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
