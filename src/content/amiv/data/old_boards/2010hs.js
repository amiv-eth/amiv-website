// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';

/**
 * Board information for autumn semester 2010 (HS10)
 */
export default {
  year: 2010,
  semester: 'hs',
  members: [
    {
      role: boardRoles.president,
      name: 'Rafael Götti',
    },
    {
      role: boardRoles.quaestor,
      name: 'Ismail Morgenegg',
    },
    {
      role: boardRoles.information,
      name: 'James Guthrie',
    },
    {
      role: boardRoles.information,
      name: 'Fabian Brun',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Michael Wirth',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Merlin Batzill',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Michael Bieri',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Michael Neuert',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Petros Papadopoulos',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Andreas Züger',
    },
  ],
};
