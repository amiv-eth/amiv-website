// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/fs14.jpg';

/**
 * Board information for spring semester 2014 (FS14)
 */
export default {
  year: 2014,
  semester: 'fs',
  image: boardImage,
  members: [
    {
      role: boardRoles.president,
      name: 'Beat Hörmann',
    },
    {
      role: boardRoles.quaestor,
      name: 'Frank Grossenbacher',
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
      name: 'Fynn von Ksitowski',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Alen Mujkanovic',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Hermann Blum',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'David Vogt',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Alexander Dietmüller',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Tim Seyde',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Vital Stocker',
    },
  ],
};
