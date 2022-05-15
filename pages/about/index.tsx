import Head from 'next/head';
import Container from '../../components/container';
// import MoreStories from '../../components/more-stories';
// import HeroPost from '../../components/hero-post';
import Intro from '../../components/intro';
import Layout from '../../components/layout';
// import { getAllPosts } from '../../lib/api';
// import { CMS_NAME } from '../../lib/constants';
import Post from '../../types/post';

type Props = {
  allPosts: Post[];
};

const faqs = [
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'How do you make holy water?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  // More questions...
];

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Layout>
        <Head>
          <title>Color Palettes</title>
        </Head>
        <Container>
          <Intro />
          <section className="max-w-xl mx-auto py-16 prose prose-lg">
            <p>👋 about</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad libero
              magnam est enim eum iste natus provident quam quisquam repellat
              minima, dolorum porro deleniti, dolor quod. Explicabo veniam
              tempora harum?
            </p>
          </section>
          <div className="max-w-7xl mx-auto py-16 lg:py-20">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div>
                <h2 className="text-3xl font-bold font-sans text-gray-900">
                  Frequently asked questions
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Can’t find the answer you’re looking for? Reach out to our{' '}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    customer support
                  </a>{' '}
                  team.
                </p>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-2">
                <dl className="space-y-12">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  // const allPosts = getAllPosts([
  //   'title',
  //   'date',
  //   'slug',
  //   'author',
  //   'coverImage',
  //   'excerpt',
  // ]);

  return {
    props: { allPosts: [] },
  };
};
