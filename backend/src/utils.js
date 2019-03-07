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

function isLoggedIn(ctx) {
  if (!ctx.request.userId) {
    throw new Error('You must be logged in to do that.');
  }
}

exports.hasPermission = hasPermission;
exports.isLoggedIn = isLoggedIn;
