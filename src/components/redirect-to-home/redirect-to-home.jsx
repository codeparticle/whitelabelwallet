import React from 'react';
import { Redirect } from 'react-router';
import { ROUTES } from 'lib/constants';

const { MY_WALLETS } = ROUTES;

export function RedirectToHome() {
  return (
    <Redirect to={`/${MY_WALLETS}`} />
  );
}