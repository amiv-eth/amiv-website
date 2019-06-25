// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';

/**
 * Board information for spring semester 2011 (FS11)
 */
export default {
  year: 2011,
  semester: 'fs',
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
      name: 'Michael Wirth',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Johannes Suter',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Merlin Batzill',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Holgar Hippke',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Lukas Schrittwieser',
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
