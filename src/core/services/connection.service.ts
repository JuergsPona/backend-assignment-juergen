import { Injectable } from '@nestjs/common';
import { GetConnectionsParams, OpendataService } from '~/infra/opendata';
import { GetConnectionsArgs } from '../args/get-connections.args';
import {
  decodeCursor,
  encodeCursor,
  toDateString,
  toTimeString,
  transformData,
} from '../helpers';
import { ConnectionListModel } from '../models';

@Injectable()
export class ConnectionService {
  constructor(private readonly opendataService: OpendataService) {}

  public async getConnections(
    args: GetConnectionsArgs,
  ): Promise<ConnectionListModel> {
    const page = args.after ? decodeCursor(args.after) : 0;

    const date = args.departsAt ? toDateString(args.departsAt) : '';
    const time = args.departsAt ? toTimeString(args.departsAt) : '';

    const connectionParam: GetConnectionsParams = {
      from: args.from,
      to: args.to,
      via: args.via,
      date: date,
      time: time,
      limit: 2,
      page: page,
    };

    const data = await this.opendataService.getConnections(connectionParam);
    console.log('🚀 ~ ConnectionService ~ data:', data[1]);

    const endCursor = encodeCursor(page + data.length);

    return transformData(data, endCursor);
  }
}
