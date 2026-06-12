from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    """
    Allows read-only access to anyone authenticated or not.
    Write access is restricted to admin/staff users.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to admin/staff users.
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)

class IsAdminOrMember(permissions.IsAuthenticated):
    """
    Allows full access to admins/staff.
    Allows read-only access to members.
    """
    def has_permission(self, request, view):
        if not bool(request.user and request.user.is_authenticated):
            return False
            
        if request.method in permissions.SAFE_METHODS:
            return True
            
        return bool(request.user.is_staff)

