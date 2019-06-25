// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';

/**
 * Board information for spring semester 2013 (FS13)
 */
export default {
  year: 2013,
  semester: 'fs',
  members: [
    {
      role: boardRoles.president,
      name: 'Alex Popert',
    },
    {
      role: boardRoles.quaestor,
      name: 'Steffen Schmidt',
    },
    {
      role: boardRoles.it,
      name: 'Fabin Bosch',
    },
    {
      role: boardRoles.information,
      name: 'Linus Marty',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Cosima Du Parquier',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Alen Mujkanovic',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Timon Ruban',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'David Vogt',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Maximilian Babor',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Beat Hörmann',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Roger Wallimann',
    },
  ],
};
