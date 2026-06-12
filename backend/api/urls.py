from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MemberViewSet, EventViewSet, EventGalleryViewSet, DomainViewSet,
    TeamMemberViewSet, ContactMessageViewSet, MembershipApplicationViewSet,
    NewsletterSubscriberViewSet, EventRegistrationViewSet, AdminStatsView,
    MemberLoginView
)

router = DefaultRouter()
router.register(r'members', MemberViewSet)
router.register(r'events', EventViewSet)
router.register(r'event-gallery', EventGalleryViewSet)
router.register(r'domains', DomainViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'applications', MembershipApplicationViewSet)
router.register(r'newsletter', NewsletterSubscriberViewSet)
router.register(r'event-registrations', EventRegistrationViewSet)

urlpatterns = [
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('member-login/', MemberLoginView.as_view(), name='member-login'),
    path('', include(router.urls)),
]
