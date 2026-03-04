/**
 * Game Rules — Domain constants for Battleship.
 *
 * Single source of truth for grid dimensions and fleet composition.
 * No UI or state management logic belongs here.
 */
import { ShipType } from '@/types/game-enums';

// ─── Grid ────────────────────────────────────────────────────────────────────

export const GRID_SIZE = 10;

/** Side-length of a single grid cell in pixels. Used by visual components. */
export const CELL_SIZE = 40;

// ─── Fleet Configuration ─────────────────────────────────────────────────────

export interface FleetShipConfig {
  /** Number of cells the ship occupies. */
  size: number;
  /** How many instances of this ship exist in a fleet. */
  count: number;
  /** Human-readable label (PT-BR). */
  label: string;
}

/**
 * Canonical fleet configuration.
 * Maps each `ShipType` to its size, count and display label.
 *
 * Sizes follow the standard Battleship rules:
 *   Porta-Aviões (Carrier) — 5
 *   Encouraçado  (Battleship) — 4
 *   Submarino    (Submarine) — 3
 *   Destroyer    (Destroyer) — 3
 *   Patrulha     (Patrol Boat) — 2
 */
export const FLEET_CONFIG: Record<ShipType, FleetShipConfig> = {
  [ShipType.PORTA_AVIAO]: { size: 5, count: 1, label: 'Porta-Aviões' },
  [ShipType.ENCOURACADO]: { size: 4, count: 1, label: 'Encouraçado' },
  [ShipType.SUBMARINE]:   { size: 3, count: 1, label: 'Submarino' },
  [ShipType.DESTROYER]:   { size: 3, count: 1, label: 'Destroyer' },
  [ShipType.PATRULHA]:    { size: 2, count: 1, label: 'Patrulha' },
};

/**
 * Total number of individual ships in a fleet (sum of all counts).
 */
export const TOTAL_SHIP_COUNT = Object.values(FLEET_CONFIG).reduce(
  (sum, cfg) => sum + cfg.count,
  0,
);
