import React, { Fragment } from 'react';
import { Accordion, Icon, Grid, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';

const entity = (key, value, properties) => {
  return (
    <div key={value}>
      {key.includes('Time')
        ? `${key}: ${format(properties[value], 'MM/DD/YYYY HH:MM')}`
        : key.includes('Date')
          ? `${key}: ${format(properties[value], 'MM/DD/YYYY')}`
          : `${key}: ${properties[value]}`}
    </div>
  );
};

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
                {Object.entries(attributes).map(([key, value]) =>
                  entity(key, value, properties)
                )}
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </Accordion.Content>
    </Fragment>
  );
};
