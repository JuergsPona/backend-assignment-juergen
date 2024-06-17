import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetStationsArgs } from '~/core/args';
import { StationModel } from '~/core/models';
import { StationService } from '~/core/services';

@Resolver()
export class StationsGqlQueryResolver {
  constructor(private readonly stationService: StationService) {}

  @Query(() => [StationModel])
  public async stations(
    @Args() args: GetStationsArgs,
  ): Promise<StationModel[]> {
    const stations = await this.stationService.getStations(args);

    return stations;
  }
}
