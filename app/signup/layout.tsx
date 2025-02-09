import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup Page',
  description: 'Signup to your account',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={'inset-0 fixed'}>{children}</div>;
}
