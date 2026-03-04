/**
 * Quick validation test for useSetupStore (new architecture)
 *
 * Run with: npx tsx src/stores/test-setup-store.ts
 */

import { useSetupStore, isValidPlacement, isWithinBounds, getShipCells } from './useSetupStore';
import { ShipType, ShipOrientation } from '@/types/game-enums';

console.log('🧪 Testing useSetupStore (v2 — dock / board architecture)...\n');

// ── Test 1: Initial State ────────────────────────────────────────────────────
const s1 = useSetupStore.getState();
console.log('✅ Test 1: Initial State');
console.log('   Available (dock):', s1.availableShips.length, '— expected 5');
console.log('   Placed (board):', s1.placedShips.length, '— expected 0');
console.log('   allShipsPlaced:', s1.allShipsPlaced(), '— expected false');
console.log('');

// ── Test 2: Place a ship ─────────────────────────────────────────────────────
const patrulhaId = s1.availableShips.find((s) => s.type === ShipType.PATRULHA)!.id;
console.log('✅ Test 2: Place Patrulha (size 2) at (0, 0) Horizontal');
const placed2 = useSetupStore.getState().placeShip(patrulhaId, 0, 0);
const s2 = useSetupStore.getState();
console.log('   Success:', placed2, '— expected true');
console.log('   Available:', s2.availableShips.length, '— expected 4');
console.log('   Placed:', s2.placedShips.length, '— expected 1');
console.log('');

// ── Test 3: Out-of-bounds ────────────────────────────────────────────────────
const portaAvId = s2.availableShips.find((s) => s.type === ShipType.PORTA_AVIAO)!.id;
console.log('✅ Test 3: Place Porta-Aviões (size 5) at x=8, y=0 Horizontal — should fail');
const placed3 = useSetupStore.getState().placeShip(portaAvId, 8, 0);
console.log('   Rejected:', !placed3, '— expected true');
console.log('');

// ── Test 4: Collision ────────────────────────────────────────────────────────
const encId = useSetupStore.getState().availableShips.find((s) => s.type === ShipType.ENCOURACADO)!.id;
console.log('✅ Test 4: Place Encouraçado (size 4) at (0, 0) — overlaps Patrulha');
const placed4 = useSetupStore.getState().placeShip(encId, 0, 0);
console.log('   Rejected:', !placed4, '— expected true');
console.log('');

// ── Test 5: Valid non-overlapping placement ──────────────────────────────────
console.log('✅ Test 5: Place Encouraçado at (3, 0) — no collision');
const placed5 = useSetupStore.getState().placeShip(encId, 3, 0);
console.log('   Success:', placed5, '— expected true');
console.log('   Placed count:', useSetupStore.getState().placedShips.length, '— expected 2');
console.log('');

// ── Test 6: Rotate on board ─────────────────────────────────────────────────
console.log('✅ Test 6: Rotate Patrulha on board (H→V)');
const rotated6 = useSetupStore.getState().rotateShip(patrulhaId);
const pShip = useSetupStore.getState().placedShips.find((s) => s.id === patrulhaId);
console.log('   Success:', rotated6, '— expected true');
console.log('   Orientation:', pShip?.orientation, '— expected Vertical');
console.log('');

// ── Test 7: Remove ship (board → dock) ──────────────────────────────────────
console.log('✅ Test 7: Remove Patrulha (board → dock)');
useSetupStore.getState().removeShip(patrulhaId);
const s7 = useSetupStore.getState();
console.log('   Available:', s7.availableShips.length, '— expected 4');
console.log('   Placed:', s7.placedShips.length, '— expected 1');
console.log('');

// ── Test 8: Reset fleet ──────────────────────────────────────────────────────
console.log('✅ Test 8: resetFleet()');
useSetupStore.getState().resetFleet();
const s8 = useSetupStore.getState();
console.log('   Available:', s8.availableShips.length, '— expected 5');
console.log('   Placed:', s8.placedShips.length, '— expected 0');
console.log('');

// ── Test 9: Pure function — isValidPlacement ─────────────────────────────────
console.log('✅ Test 9: isValidPlacement (pure)');
console.log('   (0,0) H size 3, empty board:', isValidPlacement({ size: 3 }, 0, 0, ShipOrientation.HORIZONTAL, []), '— expected true');
console.log('   (8,0) H size 3, empty board:', isValidPlacement({ size: 3 }, 8, 0, ShipOrientation.HORIZONTAL, []), '— expected false');
console.log('   (-1,0) H size 2:', isValidPlacement({ size: 2 }, -1, 0, ShipOrientation.HORIZONTAL, []), '— expected false');
console.log('');

// ── Test 10: Pure function — getShipCells ────────────────────────────────────
console.log('✅ Test 10: getShipCells (pure)');
const cells = getShipCells(2, 3, 4, ShipOrientation.HORIZONTAL);
console.log('   H ship at (2,3) size 4:', JSON.stringify(cells));
const cellsV = getShipCells(2, 3, 4, ShipOrientation.VERTICAL);
console.log('   V ship at (2,3) size 4:', JSON.stringify(cellsV));
console.log('');

console.log("🎉 All tests completed!\n");
