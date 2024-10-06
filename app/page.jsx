import Feed from '@components/Feed';
import { unstable_noStore as noStore } from 'next/cache';

const Home = () => {
  noStore();
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover & Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">Promptopia is an open-source AI prompting tool
            form modern world to discover and share createive prompts.
        </p>
        <Feed />
    </section>
  )
}

export default Home