// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/hs14.jpg';

/**
 * Board information for autumn semester 2014 (HS14)
 */
export default {
  year: 2014,
  semester: 'hs',
  image: boardImage,
  members: [
    {
      role: boardRoles.president,
      name: 'Alexander Dietmüller',
    },
    {
      role: boardRoles.quaestor,
      name: 'Pascal Gutzwiller',
    },
    {
      role: boardRoles.it,
      name: 'Carlos Gomes',
    },
    {
      role: boardRoles.information,
      name: 'Aldo Tobler',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Moritz Zimmermann',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Nicolas Sollich',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Tilman Bohn',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Felix Böwing',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Jonas Peschel',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Kay Wacker',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Sebastian Ratz',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Moritz Schneider',
    },
  ],
};
