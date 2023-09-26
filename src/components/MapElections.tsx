import { Map, GeoJson, ZoomControl, Overlay } from 'pigeon-maps';
import { useState } from 'react';
import { Elections, Sections } from '../../utils/const';
import { generateStyles } from '../../lib/generateStyles';
import { useApi } from '../../lib/useApi';
import type { Feature, GeoJSONResponse, Properties } from '../../types/index';

const geoJsonLink: string = 'data/data.geojson';

export function MapElections() {
  const { data, loading, error } = useApi<GeoJSONResponse>(geoJsonLink);
  const [city, setCity] = useState<string>('');
  const [election, setElection] = useState<string>(Elections[0].field);
  const [section, setSection] = useState<string>('');

  if (loading)
    return (
      <section className='h-screen flex place-content-center'>
        <span className='loading loading-spinner loading-xs'></span>
      </section>
    );
  if (error) return <p>Error!</p>;

  const processedData = {
    ...data,
    features: data?.features.map((feature: any) => {
      const { properties } = feature;
      return {
        ...feature,
        properties: {
          ...properties,
          section: Sections.find((section) =>
            section.cities.includes(properties.departamen)
          )?.name,
        },
      };
    }),
  };

  const cities = Array.from(
    new Set(
      processedData.features &&
        processedData.features
          .filter(
            (feature) =>
              feature.properties.section === section || section === ''
          )
          .map((feature: any) => feature.properties.departamen)
    )
  );

  return (
    <section className='h-screen'>
      <div className='flex h-screen lg:flex-row flex-col'>
        <aside className='p-3 sm:w-full lg:w-1/3'>
          <div
            role='filter'
            className='p-3 flex lg:flex-col sm:flex-row justify-between items-center gap-2'>
            <img
              src='/images/logo-union-2x.png'
              alt='Logo'
              className='hidden lg:w-60 lg:block'
            />
            <img
              src='/images/logo-footer.png'
              alt='Logo'
              className='block w-16 md:w-24 lg:hidden'
            />
            <div className='divider'></div>
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
            <select
              className='select select-ghost w-full max-w-xs'
              value={section}
              onChange={(e) => {
                setCity('');
                setSection(e.target.value);
              }}>
              <option value=''>Todas las secciones</option>
              {Sections.map((section) => (
                <option value={section.name} key={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
            {cities && (
              <select
                className='select select-ghost w-full max-w-xs'
                onChange={(e) => setCity(e.target.value)}
                value={city}>
                <option value=''>Todos los districtos</option>
                {cities.map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className='p-3 w-full hidden lg:block'>
            <div className='overflow-x-auto h-96'>
              <table className='table w-full'>
                <thead>
                  <tr>
                    <th>Distrito</th>
                    <th>Circuito</th>
                    <th>Fuerza</th>
                    <th>{election === 'votos' ? 'Votos' : 'Porcentaje'}</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData?.features &&
                    processedData.features
                      .filter(
                        (feature) =>
                          feature.properties.section === section ||
                          section === ''
                      )
                      .filter(
                        (feature) =>
                          feature.properties.departamen === city || city === ''
                      )
                      .filter(
                        (feature) =>
                          feature.properties[
                            Elections.find((e) => e.field === election)
                              ?.percent as keyof Properties
                          ] !== 0
                      )
                      .sort((a, b) =>
                        a.properties.departamen > b.properties.departamen
                          ? 1
                          : -1
                      )
                      .map((feature: Feature) => (
                        <tr>
                          <td>{feature.properties.departamen}</td>
                          <td>{feature.properties.circuito}</td>
                          <td>
                            {feature.properties[election as keyof Properties]}
                          </td>
                          <td>
                            {
                              feature.properties[
                                Elections.find((e) => e.field === election)
                                  ?.percent as keyof Properties
                              ]
                            }{' '}
                            %
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </aside>
        {processedData && (
          <Map defaultCenter={[-37.478754, -60.198724]} defaultZoom={6}>
            <ZoomControl />
            <GeoJson
              data={processedData}
              styleCallback={({ properties }: { properties: Properties }) => {
                return generateStyles(properties, section, city, election);
              }}
              onClick={(event: any) => {
                setCity(event.payload.properties.departamen);
                setSection(event.payload.properties.section);
              }}
            />
          </Map>
        )}
      </div>
    </section>
  );
}
