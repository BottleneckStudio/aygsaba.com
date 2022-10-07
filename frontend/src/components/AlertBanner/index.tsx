import React, { FC } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { Container, BannerClose } from './components';
import { AlertBannerOptions } from '../../types/layout-options';

const AlertBanner: FC<AlertBannerOptions> = ({
  open,
  content,
  type,
  onClose
}) => {
  const closeBanner = () => onClose();

  return (
    <Container
      isOpen={open}
      type={type}
    >
      <p>{content}</p>
      <BannerClose onClick={closeBanner}>
        <CloseRoundedIcon />
      </BannerClose>
    </Container>
  );
};

export default AlertBanner;
