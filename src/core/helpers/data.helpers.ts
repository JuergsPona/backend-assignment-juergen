import {
  ConnectionListModel,
  ConnectionModel,
  PageInfoModel,
  SectionModel,
  StationModel,
} from '~/core/models'; // Adjust the import according to your project structure
import { ConnectionSchema } from '~/infra/opendata';

export const transformData = (
  data: ConnectionSchema[],
  endCursor: string | null,
): ConnectionListModel => {
  const connections: ConnectionModel[] = data.map((item) => {
    const fromStation: StationModel = {
      id: item.from.station.id,
      name: item.from.station.name,
      coordinates: {
        latitude: item.from.station.coordinate.x,
        longitude: item.from.station.coordinate.y,
      },
    };

    const toStation: StationModel = {
      id: item.to.station.id,
      name: item.to.station.name,
      coordinates: {
        latitude: item.to.station.coordinate.x,
        longitude: item.to.station.coordinate.y,
      },
    };

    const sections: SectionModel[] = item.sections.map((section: any) => ({
      arrival: new Date(section.arrival),
      departure: new Date(section.departure),
      from: {
        id: section.from.station.id,
        name: section.from.station.name,
        coordinates: {
          latitude: section.from.station.coordinate.x,
          longitude: section.from.station.coordinate.y,
        },
      },
      to: {
        id: section.to.station.id,
        name: section.to.station.name,
        coordinates: {
          latitude: section.to.station.coordinate.x,
          longitude: section.to.station.coordinate.y,
        },
      },
    }));

    return {
      from: fromStation,
      to: toStation,
      departure: new Date(item.from.departure),
      arrival: new Date(item.to.arrival),
      sections: sections,
    };
  });

  const pageInfo: PageInfoModel = {
    endCursor: endCursor,
  };

  return {
    nodes: connections,
    pageInfo: pageInfo,
  };
};
