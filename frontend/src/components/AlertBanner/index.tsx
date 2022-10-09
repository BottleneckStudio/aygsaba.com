/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { Container, BannerClose } from './components';
import { AlertBannerOptions } from '../../types/layout-options';

export interface AlertBannerState {
  content: string;
  type: string;
}

const AlertBanner: FC<AlertBannerOptions> = ({
  open,
  content,
  type,
  onClose
}) => {
  const [show, setShow] = useState<boolean>(false);

  const closeBanner = () => onClose();

  useEffect(() => {
    if (open) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [open]);

  return (
    <>
      {show && (
        <Container
          isOpen={open}
          type={type}
        >
          <p>{content}</p>
          <BannerClose onClick={closeBanner}>
            <CloseRoundedIcon />
          </BannerClose>
        </Container>
      )}
    </>
  );
};

export default AlertBanner;
