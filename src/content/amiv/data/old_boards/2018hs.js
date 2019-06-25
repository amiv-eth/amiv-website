// Contains static information about a previous board.
// Markdown can be used to style the text.

import { boardRoles } from '../board_roles';
import boardImage from '../../images/board/old/hs18.png';

/**
 * Board information for autumn semester 2018 (HS18)
 */
export default {
  year: 2018,
  semester: 'hs',
  image: boardImage,
  members: [
    {
      role: boardRoles.president,
      name: 'Antonia Mosberger',
    },
    {
      role: boardRoles.quaestor,
      name: 'Luzian Bieri',
    },
    {
      role: boardRoles.it,
      name: 'Sandro Lutz',
    },
    {
      role: boardRoles.information,
      name: 'Patricia Schmid',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Lina Gehri',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Betty Lory',
    },
    {
      role: boardRoles.eventPlanning,
      name: 'Ian Boschung',
    },
    {
      role: boardRoles.universityPolicyItet,
      name: 'Daniel Biek',
    },
    {
      role: boardRoles.universityPolicyMavt,
      name: 'Julia Jäggi',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Silvio Geel',
    },
    {
      role: boardRoles.externalRelations,
      name: 'Marie Matos',
    },
    {
      role: boardRoles.infrastructure,
      name: 'Lukas Eberle',
    },
  ],
};
