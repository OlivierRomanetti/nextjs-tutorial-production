import Link from 'next/link';

const AboutPage = () => {
  return (
    <div>
      <h1 className="text-7xl">About Page</h1>
      <Link href="/" className="text-2xl">
        home Page
      </Link>
    </div>
  );
};

export default AboutPage;
