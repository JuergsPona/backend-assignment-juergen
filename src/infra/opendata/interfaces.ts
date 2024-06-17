export interface GetStationsParams {
  query?: string;
  x?: number;
  y?: number;
  type?: string;
}

export interface GetConnectionsParams {
  from: string;
  to: string;
  via?: string[] | null;
  date?: string;
  time?: string;
  isArrivalTime?: boolean;
  transportations?: string[]; // train, tram, ship, bus, cableway
  limit?: number;
  page?: number;
}
