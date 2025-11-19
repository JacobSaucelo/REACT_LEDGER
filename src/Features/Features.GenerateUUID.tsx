/**
 * Generates a UUID v7 string
 * @returns {string} A UUID v7 string
 */

import { v7 as uuidv7 } from "uuid";

export function FEATURES_Generate_UUID() {
  return uuidv7();
}
