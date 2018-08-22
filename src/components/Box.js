import React, { Fragment } from 'react';
import { Accordion, Icon, Grid, Segment } from 'semantic-ui-react';
import { getDate } from '../utils';

export default ({
  index,
  handleClick,
  title,
  featuresInside,
  attributes,
  activeIndex
}) => {
  return (
    <Fragment>
      <Accordion.Title
        active={activeIndex === index}
        index={index}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        {title}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === index}>
        <Grid stackable columns={2}>
          {featuresInside.map(({ properties }, i) => (
            <Grid.Column key={i}>
              <Segment>
                {Object.entries(attributes).map(([key, value]) => (
                  <div key={value}>
                    {value.includes('date')
                      ? `${key}: ${getDate(properties[value])}`
                      : `${key}: ${properties[value]}`}
                  </div>
                ))}
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </Accordion.Content>
    </Fragment>
  );
};
