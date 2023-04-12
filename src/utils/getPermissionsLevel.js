import { MOD_ROLE_ID, JR_MOD_ROLE_ID } from 'constants';
import { PermissionsLevel } from 'enums';

const getPermissionsLevel = message => {
  if (message.member.roles.cache.some(role => [MOD_ROLE_ID, JR_MOD_ROLE_ID].includes(role.id))) {
    return PermissionsLevel.MOD;
  }

  return PermissionsLevel.USER;
};

export default getPermissionsLevel;
