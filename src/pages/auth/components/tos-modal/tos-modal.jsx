/**
 * @fileoverview Terms of Service Modal - Auth Page
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import {
  Modal,
  Overlay,
  OverflowContainer,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { AUTH_CONSTANTS } from 'lib/constants';

import { MOCK_TOS } from 'pages/auth/utils';
import './tos-modal.scss';

const { SvgTermsOfService } = svgs.icons;
const { SIGNUP, TOS } = AUTH_CONSTANTS;

const Icon = (props) => <SvgTermsOfService {...props} height={90} />;

function ModalComponent({ isMobile, ...props }) {
  return isMobile
    ? (
      <Overlay
        {...props}
        hasFooter={false}
        Icon={Icon}
      />
    ) : (
      <Modal
        {...props}
        customStyles={{
          overflow: 'hidden',
        }}
      />
    );
}

function TOSModal({
  history,
  match,
  subTitle,
  title,
}) {
  const { isMobile } = useMedia();
  const visible = match.path.includes(SIGNUP);
  const showModal = match.path.includes(TOS);

  function onClose() {
    history.push(`/${SIGNUP}`);
  }

  return (
    <Visible when={visible}>
      <ModalComponent
        isMobile={isMobile}
        isOpen={showModal}
        onClose={onClose}
        subTitle={subTitle}
        title={title}
        useAltTheme
      >
        <div className="tos-modal-content">
          <OverflowContainer>
            {MOCK_TOS}
          </OverflowContainer>
        </div>
      </ModalComponent>
    </Visible>
  );
}

TOSModal.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export { TOSModal };
