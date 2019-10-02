/**
 * @fileoverview A component for safely rendering a prop
 * @author Gabriel Womble
 */
import React, { Fragment } from 'react';
import { PROP_TYPES } from 'lib/constants';
import { Visible } from '@codeparticle/react-visible';

const { renderable } = PROP_TYPES;
const exists = (val) => val !== null && typeof val !== 'undefined';

function RenderProp({
  children: Prop,
}) {
  // Fixes Visible's required child propType
  const RenderedProp = Prop || <Fragment />;

  return (
    <Visible when={exists(Prop)}>
      {typeof RenderedProp === 'function' ? <RenderedProp /> : RenderedProp}
    </Visible>
  );
}

RenderProp.defaultProps = {
  children: null,
};

RenderProp.propTypes = {
  children: renderable,
};

export { RenderProp };