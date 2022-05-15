import { createContext, useContext, useReducer, ReactNode } from 'react';
// import colors from 'nice-color-palettes';

// import colorsDicts from 'dictionary-of-colour-combinations';

const MIN_COLORS = 0;

// const map = colorsDicts.reduce((map, color, i) => {
//   color.combinations.forEach((id) => {
//     if (map.has(id)) map.get(id).push(i);
//     else map.set(id, [i]);
//   });
//   return map;
// }, new Map());

// const palettes = [...map.entries()]
//   .sort((a, b) => a[0] - b[0])
//   .map((e) => e[1]);

const DEFAULT_PALETTE = ['#5e9fa3', '#dcd1b4', '#fab87f', '#f87e7b', '#b05574'];

// const paletteColors = colors;

// const getRandomPaletteIndex2 = () =>
//   Math.floor(Math.random() * paletteColors.length);

const getRandomPaletteIndex = () => Math.floor(Math.random() * palettes.length);

type Action = { type: 'setRandom' } | { type: 'decrement' };
type Dispatch = (action: Action) => void;
type State = { colors: string[]; paletteIndex: number; palettes: number[][] };
type ColorProviderProps = { children: ReactNode };

const ColorStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function colorReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setRandom': {
      const newPaletteIdx = getRandomPaletteIndex();
      // const newPaletteIdx =
      //   state.paletteIndex <= palettes.length ? state.paletteIndex + 1 : 0;
      // const newPalette = palettes[newPaletteIdx];
      // const newColors = newPalette.map((pal: number) => colorsDicts[pal]?.hex);

      return { colors: [], paletteIndex: newPaletteIdx, palettes: [] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ColorProvider({ children }: ColorProviderProps) {
  const [state, dispatch] = useReducer(colorReducer, {
    colors: DEFAULT_PALETTE,
    paletteIndex: 0,
    palettes: [],
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <ColorStateContext.Provider value={value}>
      {children}
    </ColorStateContext.Provider>
  );
}

function useColor() {
  const context = useContext(ColorStateContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
}
export { ColorProvider, useColor };
