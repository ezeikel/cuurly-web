function hasPermission(user, permissionsNeeded) {
  // TODO: Everybody has permission for now
  return;
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions
      : ${permissionsNeeded}
      You Have:
      ${user.permissions}
      `);
  }
}

exports.hasPermission = hasPermission;
