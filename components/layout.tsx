import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
// import { useColor } from '../lib/color-context';

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  // const { state } = useColor();

  return (
    <div>
      <Meta />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
