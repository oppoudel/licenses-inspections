import React, { Fragment } from 'react';
import { Accordion, Icon, Grid, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';

export default ({ features, activeIndex, index, handleClick, title }) => {
  const attrByTrade = features.reduce((obj, feature) => {
    const tradeName = feature.properties.tradename;
    return {
      ...obj,
      [tradeName]: [...(obj[tradeName] || []), feature]
    };
  }, {});
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
          {Object.keys(attrByTrade).map((item, i) => (
            <Grid.Column key={i}>
              <Segment.Group>
                <div style={{ padding: 10 }}>
                  <strong>{item}</strong>
                </div>
                {attrByTrade[item].map((person, i) => (
                  <Segment key={i}>
                    <div>
                      Licensee: {person.properties.licenseefirstname}{' '}
                      {person.properties.licenseelastname}
                    </div>
                    <div>
                      License End Date:{' '}
                      {format(person.properties.licenseenddate, 'MM/DD/YYYY')}
                    </div>
                    <div>License Class: {person.properties.licenseclass}</div>
                  </Segment>
                ))}
              </Segment.Group>
            </Grid.Column>
          ))}
        </Grid>
      </Accordion.Content>
    </Fragment>
  );
};
