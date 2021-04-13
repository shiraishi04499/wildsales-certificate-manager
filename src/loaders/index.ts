// import Logger from '../submodules/loaders/logger';
import expressLoader from './express';

export default async ({ expressApp }) => {
  // expressの初期設定を行う
  await expressLoader({ app: expressApp });
};
