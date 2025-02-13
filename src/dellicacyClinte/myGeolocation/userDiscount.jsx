import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseconfig/firebaseconfig';

function SuggestedMarkets({ userLocation }) {
  const [markets, setMarkets] = useState([]);
  const [suggestedMarkets, setSuggestedMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'markets'));
          const allMarkets = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMarkets(allMarkets);
        } catch (error) {
          console.error('Erro ao buscar mercados:', error);
        }
      };
      

    fetchMarkets();
  }, []);

  useEffect(() => {
    if (userLocation && markets.length > 0) {
      const nearbyMarkets = markets
        .map((market) => ({
          ...market,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            market.latitude,
            market.longitude
          ),
        }))
        .filter((market) => market.distance <= 5) // Mercados até 5 km
        .sort((a, b) => a.distance - b.distance);

      setSuggestedMarkets(nearbyMarkets);
    }
  }, [userLocation, markets]);

  return (
    <div>
    <h2>Mercados próximos</h2>
    {suggestedMarkets.length === 0 ? (
      <p>Não encontramos mercados próximos a você.</p>
    ) : (
      suggestedMarkets.map((market) => (
        <div key={market.id} style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem 0' }}>
          <h3>{market.name}</h3>
          <p>Endereço: {market.address}</p>
          <p>Distância: {market.distance.toFixed(2)} km</p>
        </div>
      ))
    )}
  </div>
  );
}

export default SuggestedMarkets;
