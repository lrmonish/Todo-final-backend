function isAuthorized(action, userRole) {
    const permissions = {
      USER: {
        readTodos: true,
        createTodos: true,
        editOwnTodos: true,
      },
      ADMIN: {
        ...USER, // Inherit USER permissions
        readAnyTodos: true,
        editAnyTodos: true,
        manageUsers: true,
      },
      GUEST: {
        readPublicTodos: true,
      },
    };
  
    return permissions[userRole] && permissions[userRole][action];
  }
  
  // Usage example
  const canEditTodo = isAuthorized('editTodo', userRole);
  if (canEditTodo) {
    // Allow editing
  } else {
    // Display an error message or handle permission denial
  }
  