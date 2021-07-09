import React from 'react';
import HeaderComponent from './header.component';

export default function Layout({ children }: any) {
  return (
    <div>
      <HeaderComponent />
      <main>{children}</main>
    </div>
  );
}