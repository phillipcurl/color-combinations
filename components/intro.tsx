import Link from 'next/link';
import nightwind from 'nightwind/helper';
import {
  MoonIcon,
  SunIcon,
  // ColorSwatchIcon,
  // RefreshIcon,
} from '@heroicons/react/outline';

// import { useColor } from '../lib/color-context';
// import { CMS_NAME } from '../lib/constants';

const Intro = () => {
  // const { dispatch } = useColor();

  return (
    <header className="flex-col md:flex-row flex items-center space-y-6 md:space-y-0 md:justify-between py-16 md:py-10">
      <Link href="/">
        <a className="text-3xl md:text-4xl font-bold font-sans tracking-tighter leading-tight md:pr-8 hover:underline">
          <svg
            id="Layer_1"
            style={{ enableBackground: 'new 0 0 32 32' }}
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            xmlSpace="preserve"
            className="w-12 h-12"
          >
            <path
              id="color--contrast_1_"
              d="M16,31.36C7.53,31.36,0.64,24.47,0.64,16S7.53,0.64,16,0.64S31.36,7.53,31.36,16&#xA;&#x9;S24.47,31.36,16,31.36z M16,1.36C7.927,1.36,1.36,7.927,1.36,16c0,8.072,6.567,14.64,14.64,14.64c0.673,0,1.336-0.045,1.985-0.134&#xA;&#x9;l12.521-12.521c0.089-0.649,0.134-1.312,0.134-1.985c0-0.677-0.046-1.343-0.135-1.996l-14.25,14.25l-0.509-0.51l14.613-14.613&#xA;&#x9;c-0.21-1.053-0.533-2.065-0.957-3.025L16.254,23.255l-0.509-0.51L29.074,9.417c-0.437-0.863-0.956-1.678-1.548-2.434L16.254,18.255&#xA;&#x9;l-0.509-0.51l11.321-11.32c-0.616-0.71-1.3-1.362-2.039-1.943l-8.773,8.772l-0.509-0.509l8.699-8.699&#xA;&#x9;C23.652,3.484,22.801,3,21.905,2.603l-5.651,5.65l-0.509-0.509l5.438-5.438c-1.009-0.383-2.071-0.658-3.172-0.81l-1.757,1.757&#xA;&#x9;l-0.509-0.509L17.091,1.4C16.73,1.374,16.367,1.36,16,1.36z M30.281,19.228L19.228,30.281&#xA;&#x9;C24.714,29.042,29.042,24.714,30.281,19.228z"
              fill="currentColor"
            />
            <rect
              height="32"
              id="_Transparent_Rectangle"
              style={{ fill: 'none' }}
              width="32"
            />
          </svg>
        </a>
      </Link>
      <div className="flex-grow-1 inline-flex items-center space-x-6">
        <Link href="/">
          <a className="hover:underline p-2">combinations</a>
        </Link>
        <Link href="/colors">
          <a className="hover:underline p-2">colors</a>
        </Link>
        {/* <Link href="/posts">
          <a className="hover:underline p-2">writing</a>
        </Link> */}
        <button
          className="p-2 inline-flex items-center justify-center"
          onClick={() => nightwind.toggle()}
        >
          {typeof window !== 'undefined' &&
          document.documentElement.classList.contains('dark') ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>
        {/* <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            type="button"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => dispatch({ type: 'setRandom' })}
          >
            <span className="sr-only">Previous</span>

            <RefreshIcon className="w-6 h-6" />
          </button>
          <Link href="/combinations">
            <a className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <ColorSwatchIcon className="w-5 h-5" />
              Palettes
            </a>
          </Link>
        </span> */}

        {/* <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        product engineer
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and {CMS_NAME}.
      </h4> */}
      </div>
    </header>
  );
};

export default Intro;
