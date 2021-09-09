/* eslint-disable react/no-array-index-key */
import React, {useState, useEffect} from 'react';
import {View} from 'components/UI';
import useLocation from 'services/useLocation';
import Fabs from 'components/Fabs';
import CreatePoint from 'components/CreatePoint';
import {useSelector} from 'react-redux';
import * as selectors from 'store/selectors';
import {Marker} from 'react-native-maps';
import {MapView} from './styles';

const Map = () => {
  const {location} = useLocation();
  const [showPointCreation, setShowPointCreation] = useState(false);
  const [region, setRegion] = useState({});
  const markers = useSelector(selectors.markers);

  const actions = [
    {
      icon: 'draw-polygon',
      onPress: () => {},
    },
    {
      icon: 'map-marker-alt',
      onPress: () => setShowPointCreation(true),
    },
  ];

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  const alwaysOpenActions = [
    {
      icon: 'street-view',
      onPress: () => {},
    },
  ];

  if (location) {
    return (
      <View flex={1}>
        <MapView
          region={region}
          onRegionChangeComplete={(value) => setRegion(value)}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <Fabs actions={actions} alwaysOpenActions={alwaysOpenActions} />
        <CreatePoint
          locationSelected={region}
          show={showPointCreation}
          onClose={() => setShowPointCreation(false)}
        />
      </View>
    );
  }

  return null;
};

export default Map;
