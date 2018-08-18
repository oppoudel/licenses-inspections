import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import brand from '../CITY-LOGO.png';

export default () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <Image src={brand} alt="City Logo" size="mini" />
        </Menu.Item>
        <Menu.Item header as="h3">
          Licenses & Inspections
        </Menu.Item>
      </Container>
    </Menu>
  );
};
