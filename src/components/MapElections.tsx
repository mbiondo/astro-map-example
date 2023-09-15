import { Map, GeoJson } from 'pigeon-maps';
import { useState } from 'react';
import { Elections } from '../../utils/const';
import { generateStyles } from '../../lib/generateStyles';
import { useApi } from '../../lib/useApi';
import type { GeoJSONResponse, Properties } from '../../types/index';

const geoJsonLink: string = 'data/data.geojson';

export function MapElections() {
  const { data, loading, error } = useApi<GeoJSONResponse>(geoJsonLink);
  const [city, setCity] = useState<string>('');
  const [election, setElection] = useState<string>(Elections[0].field);

  if (loading)
    return (
      <section className='h-screen flex place-content-center'>
        <span className='loading loading-spinner loading-xs'></span>
      </section>
    );
  if (error) return <p>Error!</p>;
  const cities = Array.from(
    new Set(data?.features.map((feature: any) => feature.properties.departamen))
  );

  return (
    <section className='h-screen'>
      <div role='filter' className='p-3 flex justify-between items-center'>
        <h2 className='text-2xl'>Elecciones</h2>
        <select
          className='select select-ghost w-full max-w-xs'
          value={election}
          onChange={(e) => setElection(e.target.value)}>
          {Elections.map((election) => (
            <option value={election.field} key={election.field}>
              {election.name}
            </option>
          ))}
        </select>
        {cities && (
          <select
            className='select select-ghost w-full max-w-xs'
            onChange={(e) => setCity(e.target.value)}>
            <option value=''>Buenos Aires</option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </select>
        )}
      </div>

      {data && (
        <Map defaultCenter={[-34.478754, -60.198724]} defaultZoom={6}>
          <GeoJson
            data={data}
            styleCallback={({ properties }: { properties: Properties }) => {
              return generateStyles(properties, city, election);
            }}
          />
        </Map>
      )}
    </section>
  );
}
