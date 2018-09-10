import React, { Component } from 'react';
import { point } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import buffer from '@turf/buffer';
import isEqual from 'react-fast-compare';
import isEmpty from 'lodash.isempty';
import { Accordion } from 'semantic-ui-react';
import Box from './Box';
import Liquor from './Liquor';

export default class Inspections extends Component {
  state = {
    loading: true,
    activeIndex: 0,
    layers: {}
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
    const {
      layers,
      center: { x, y }
    } = this.props;
    const polygon = buffer(point([x, y]), 500, {
      units: 'feet'
    });
    if (!isEmpty(layers)) {
      const layersList = Object.keys(layers);
      layersList.map(layer =>
        this.setState(prevState => ({
          layers: {
            ...prevState.layers,
            [layer]: {
              ...layers[layer],
              features: layers[layer].features.filter(feature =>
                booleanPointInPolygon(feature, polygon)
              )
            }
          },
          loading: false
        }))
      );
    }
  };

  render() {
    const { loading, layers, activeIndex } = this.state;
    const layersList = Object.keys(layers);
    return (
      !loading && (
        <Accordion fluid styled style={{ marginBottom: 20 }}>
          {layersList.map((layer, i) => {
            const title = layers[layer].title;
            const featuresInside = layers[layer].features;
            const attributes = layers[layer].attributes;
            return layer !== 'liquorLicenses' ? (
              <Box
                key={layer}
                title={title}
                featuresInside={featuresInside}
                attributes={attributes}
                handleClick={this.handleClick}
                index={i}
                activeIndex={activeIndex}
              />
            ) : (
              <Liquor
                key={layer}
                title={title}
                features={featuresInside}
                attributes={attributes}
                handleClick={this.handleClick}
                index={i}
                activeIndex={activeIndex}
              />
            );
          })}
        </Accordion>
      )
    );
  }
}
