import { Suspense } from 'react';
import Image from 'next/image';

import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';
import { Button } from '@repo/ui/button';

import styles from './page.module.css';

const RootPage = ({ params }: { params: { forTest?: boolean } }) => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          examples/<Code className={styles.code}>with-nestjs</Code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
            rel="noopener noreferrer"
            target="_blank"
          >
            By{' '}
            <Image
              alt="Vercel Logo"
              className={styles.vercelLogo}
              height={24}
              priority
              src="/vercel.svg"
              width={100}
            />
          </a>
        </div>
      </div>

    </main>
  );
};

export default RootPage;
