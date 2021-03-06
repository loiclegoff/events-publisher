import { getEvents } from '@/core/event';
import Head from 'next/head';
import { Event } from '@/types/event';
import { DayViewer } from '@/components/day-viewer';

interface HomeProps {
  events: Event[];
}

export default function Home({ events }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-20 px-8">
        <h1 className="text-5xl text-center text-accent-1 mb-16">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <DayViewer />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {events.slice(0, events.length).map(({ title, description }) => (
            <a
              className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
              key={title}
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="font-bold mb-2">{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </a>
          ))} */}
        </div>
        {/* <div className="text-center mt-8">
          {reasons.slice(reasons.length - 1).map(({ title, description }) => (
            <div key="title" className="markdown inline-p">
              <strong>{title}</strong>
              {` `}
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div> */}
      </main>

      <footer className="width-full border-t-1 border-gray-200 flex justify-center align-center">
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center align-center"
        >
          Powered by{` `}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2" />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const events = await getEvents();

  return {
    props: {
      events,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
