import { Logo } from './navigation';

export default function Footer() {
  return (
    <footer className="border-1">
      <section className="py-10 flex justify-between">
        <Logo />
        <div className="flex flex-col gap-3 items-end text-sm font-medium">
          <span>
            Site integrated with{' '}
            <a
              href={'https://nextjs.org/'}
              className="text-red-500"
              target={'_blank'}
            >
              Next JS
            </a>{' '}
            and{' '}
            <a
              href={'https://wordpress.org/'}
              className="text-red-500"
              target={'_blank'}
            >
              Wordpress
            </a>
          </span>
          <span>
            <a
              href={'https://github.com/vslrzy/nextjs-rest-starter'}
              target={'_blank'}
            >
              Github
            </a>
          </span>
        </div>
      </section>
    </footer>
  );
}
