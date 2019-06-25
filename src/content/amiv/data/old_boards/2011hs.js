// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';

/**
 * Board information for autumn semester 2011 (HS11)
 */
export default {
  year: 2011,
  semester: 'hs',
  members: [
    {
      role: boardRoles.president,
      name: 'Benedikt Ummen',
    },
    {
      role: boardRoles.quaestor,
      name: 'Melin Batzill',
    },
    {
      role: boardRoles.information,
      name: 'James Guthrie',
    },
    {
      role: boardRoles.information,
      name: 'Desiree Clausen',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Tao Guo',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Johannes Suter',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Jesko Müller',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Bastian Wohlfender',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Petros Papadopoulos',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Benjamin Staubli',
    },
  ],
};
