import JSON5 from "json5";

export const json5Parse = <T>(content: string): T => JSON5.parse<T>(content);
