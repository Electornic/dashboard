import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'Login to your account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={'inset-0 fixed'}>{children}</div>;
}
