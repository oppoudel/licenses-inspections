import React, { Component } from 'react';
import { point } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import buffer from '@turf/buffer';
import isEqual from 'react-fast-compare';
import { Accordion, Icon, Grid, Segment } from 'semantic-ui-react';
import { getDate } from '../utils';

export default class Inspections extends Component {
  state = {
    callsInside: [],
    licensesInside: [],
    loading: true,
    activeIndex: 0
  };
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.findLocations();
    }
  }
  findLocations = () => {
    const { liquorLicenses, callsForService, x, y } = this.props;
    const polygon = buffer(point([x, y]), 0.1, {
      units: 'miles'
    });
    const licensesInside = liquorLicenses.filter(feature =>
      booleanPointInPolygon(feature, polygon)
    );
    const callsInside = callsForService.filter(feature =>
      booleanPointInPolygon(feature, polygon)
    );
    this.setState({
      licensesInside: licensesInside,
      callsInside: callsInside,
      loading: false
    });
  };

  render() {
    const { callsInside, licensesInside, loading, activeIndex } = this.state;
    return (
      !loading && (
        <Accordion fluid styled style={{ marginBottom: 20 }}>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            CAD Calls
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Grid stackable columns={2}>
              {callsInside.map(({ properties }, i) => (
                <Grid.Column key={i}>
                  <Segment>
                    Description: {properties.description} <br />
                    Location: {properties.incidentlocation} <br />
                    Priority: {properties.priority} <br />
                    Call Date: {getDate(properties.calldatetime)}
                  </Segment>
                </Grid.Column>
              ))}
            </Grid>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            Liquor Licenses
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Grid stackable columns={2}>
              {licensesInside.map(({ properties }, i) => (
                <Grid.Column key={i}>
                  <Segment>
                    Trade Name: {properties.tradename} <br />
                    License End Date: {getDate(properties.licenseenddate)}
                    <br />
                    Licenseee Name: {properties.licenseefirstname}{' '}
                    {properties.licenseelastname}
                  </Segment>
                </Grid.Column>
              ))}
            </Grid>
          </Accordion.Content>
        </Accordion>
      )
    );
  }
}
