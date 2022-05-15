import Container from './container';

const Footer = () => {
  return (
    <footer className="py-8">
      <Container>
        <div className="w-full flex flex-col lg:flex-row items-center">
          {/* <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            pc
          </h3> */}
          <div className="lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <p>&#169; Phillip Curl</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-end items-center lg:pl-4 lg:w-1/2">
            <a
              href={`https://github.com/phillipcurl`}
              className="hover:underline"
            >
              GitHub
            </a>
            {/* <a
              href="https://nextjs.org/docs/basic-features/pages"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Contact Me
            </a> */}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
