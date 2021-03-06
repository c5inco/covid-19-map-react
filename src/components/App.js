import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import LoadingIndicator from './LoadingIndicator';
import InfoWindow from './InfoWindow';
import LeafletMap from './Map';
import Titlebox from './Titlebox';
import SearchBar from './SearchBar';
import { i18nInit } from '../utils/i18n';
import { getAllCartoLayers } from '../carto/api';

export default () => {
  const i18nLoaded = useSelector(state => state.content.i18n);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await i18nInit();
    })();
    return () => null;
  }, []);

  useEffect(() => {
    (async () => {
      const cartoData = await getAllCartoLayers();
      dispatch({ type: 'data:layers', payload: cartoData });
      dispatch({ type: 'ui:loading-indicator:hide' });
    })();

    return () => null;
  }, [dispatch]);
  if (!i18nLoaded) {
    return null;
  }

  return (
    <>
      <LeafletMap />
      <SearchBar />
      <Titlebox />
      <Modal />
      <LoadingIndicator />
      <InfoWindow />
    </>
  );
};
