import { Injectable } from '@nestjs/common';
import { GetConnectionsParams, OpendataService } from '~/infra/opendata';
import { GetConnectionsArgs } from '../args/get-connections.args';
import {
  decodeCursor,
  encodeCursor,
  toDateString,
  toTimeString,
} from '../helpers';
import { ConnectionListModel, ConnectionModel } from '../models';

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

    const data: ConnectionModel[] = await this.opendataService.getConnections(
      connectionParam,
    );

    const endCursor = encodeCursor(page + data.length);

    // const connections: ConnectionListModel[] = data.filter((connectionNodes) => )

    // TODO: get connections from the OpenData service
    return {
      nodes: data,
      pageInfo: {
        endCursor,
      },
    };
  }
}
