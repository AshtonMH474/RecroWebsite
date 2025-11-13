import Link from 'next/link';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';

export default function Logo({ logo }) {
  return (
    <div className="pl-4 lg:pl-0" data-tina-field={tinaField(logo, 'logo')}>
      <Link href="/">
        <Image
          style={{height: logo.height}}
          className="cursor-pointer"
          src={logo.logo}
          alt="logo"
          width={logo.width || 150}
          height={logo.height || 50}
          priority
        />
      </Link>
    </div>
  );
}
