/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useState, useEffect } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { Container, Card, CardClose } from './components';
import { DrawerOptions } from '../../types/layout-options';

const Drawer: FC<DrawerOptions> = ({
  open,
  onClose,
  children,
  title
}) => {
  const [showBg, setShowBg] = useState<boolean>(false);
  const [showCard, setShowCard] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setShowBg(open);
      setTimeout(() => {
        setShowCard(open);
      }, 300);
    } else {
      setShowCard(open);
      setTimeout(() => {
        setShowBg(open);
      }, 300);
    }
  }, [open]);

  return (
    <>
      {showBg && (
        <Container isVisible={showCard}>
          <Card isShown={showCard}>
            <div className="header">
              <h2>{title}</h2>
              <CardClose onClick={onClose}>
                <CloseRoundedIcon />
              </CardClose>
            </div>
            <div className="content">
              {children}
            </div>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Drawer;
