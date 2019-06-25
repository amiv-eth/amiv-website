// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';

/**
 * Board information for autumn semester 2012 (HS12)
 */
export default {
  year: 2012,
  semester: 'hs',
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
      name: 'Stephanie Amrein',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Timon Ruban',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Bastian Wohlfender',
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
