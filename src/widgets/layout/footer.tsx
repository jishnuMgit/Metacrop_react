import { Typography } from '@material-tailwind/react'
import { HeartIcon } from '@heroicons/react/24/solid'

const defaultProps = {
  brandName: 'Abid',
  brandLink: 'https://abidta.github.io',
  routes: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'License', path: '/license' },
  ],
}
export function Footer() {
  const { brandName, brandLink, routes } = { ...defaultProps }
  const year = new Date().getFullYear()

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{' '}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{' '}
          <a
            rel="noreferrer"
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName}
          </a>
          for a better web.
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
