import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetConnectionsParams, GetStationsParams } from './interfaces';
import { ConnectionSchema, StationSchema } from './schemas';
@Injectable()
export class OpendataService {
  /**
   * The `HttpService` is a wrapper around the `Axios` HTTP client.
   * If you are not familiar with the Nest.js `HttpService`, feel free to use the underlying Axios instance directly.
   *
   * ```ts
   * this.httpService.axiosRef.get(...)
   * ```
   *
   * @see https://docs.nestjs.com/techniques/http-module
   */
  constructor(private httpService: HttpService) {}

  private readonly apiUrl = `https://transport.opendata.ch/v1/`;

  public async getStations(
    params: GetStationsParams,
  ): Promise<StationSchema[]> {
    // only return locations of type "station"
    const stationParams: GetStationsParams = {
      query: params.query,
      type: 'station',
    };

    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}locations`, {
        params: stationParams,
      }),
    );

    return response.data.stations;
  }

  public async getConnections(
    params: GetConnectionsParams,
  ): Promise<ConnectionSchema[]> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}connections`, {
        params: params,
      }),
    );

    // TODO: edit the response here or in the stations service?

    return response.data.connections;

    return [];
  }
}
