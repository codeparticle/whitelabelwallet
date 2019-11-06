import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  svgs,
  useTheme,
} from '@codeparticle/whitelabelwallet.styleguide';
import './address-list-item.scss';


const ICON_SIZE = '14px';
const INPUT = 'input';
const { SvgCurrencyConversionSymbol, SvgRemove } = svgs.icons;

const AddressListItem = ({
  label,
  address,
  onRefresh,
  onDelete,
}) => {
  const theme = useTheme(INPUT);

  return (
    <div className="address-list-item">
      <div className="address-info">
        <h4 className="address-title">{label}</h4>
        <div className="address-wrapper">
          <p>{address}</p>
        </div>
      </div>
      <div className="button-group">
        <div className="address-list-button-wrapper">
          <IconButton
            className="inline-button-icon"
            onClick={onRefresh}
            variant={theme.svgButtonVariant}
            icon={<SvgCurrencyConversionSymbol height={ICON_SIZE} width={ICON_SIZE} />}
          />
        </div>
        <div className="address-list-button-wrapper">
          <IconButton
            className="inline-button-icon"
            onClick={onDelete}
            variant={theme.svgButtonVariant}
            icon={<SvgRemove height={ICON_SIZE} width={ICON_SIZE} />}
          />
        </div>
      </div>
    </div>
  );
};

AddressListItem.prototypes = {
  address: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { AddressListItem };