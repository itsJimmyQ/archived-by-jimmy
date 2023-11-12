import * as i from 'types';

export type IncomingMessagePayload = {
  images: i.FormattedImage[];
  groupIndex: number;
};

export type OutgoingMessagePayload = {
  images: i.FormattedImage[];
  groupIndex: number;
};
