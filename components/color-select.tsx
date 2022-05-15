import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import useSWR from 'swr';

const fetcher = (input: any, ...args: any) =>
  fetch(input, ...args).then((res) => res.json());

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({
  onSelect,
}: {
  onSelect: (val: any) => void;
}) {
  const [selected, setSelected] = useState<any>(null);
  const { data, error } = useSWR(`/api/colors?limit=500`, fetcher);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  const isLoading = !error && !data;

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 sr-only">
            Color
          </Listbox.Label>
          <div className="relative w-56">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {selected?.hex ? (
                <>
                  <span className="flex items-center">
                    <div
                      className="flex-shrink-0 h-6 w-6 rounded-full"
                      style={{ backgroundColor: selected.hex }}
                    />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </>
              ) : (
                <span className="block truncate">Select a color</span>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {isLoading ? (
                  <div>loading</div>
                ) : (
                  <>
                    {data.colors.map((color: any, index: any) => (
                      <Listbox.Option
                        key={color.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? 'text-white bg-indigo-600'
                              : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={color}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <div
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}
                              >
                                {color.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
