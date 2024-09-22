import { Routes } from "src/config";

export const getSubscribeUrl = (bottles: string | number, months: number) =>
  `${Routes.subscribe}/${bottles}-in-${months}`;
