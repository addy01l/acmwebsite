from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from .models import Member, Event, EventGallery, Domain, TeamMember, ContactMessage, MembershipApplication, NewsletterSubscriber
from .serializers import (
    MemberSerializer, EventSerializer, EventGallerySerializer, DomainSerializer, 
    TeamMemberSerializer, ContactMessageSerializer, MembershipApplicationSerializer, 
    NewsletterSubscriberSerializer
)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('-created_at')
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated] # Only admin can manage members

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # Public can view, admin can edit

    def get_queryset(self):
        queryset = super().get_queryset()
        is_upcoming = self.request.query_params.get('is_upcoming', None)
        if is_upcoming is not None:
            is_upcoming = is_upcoming.lower() == 'true'
            queryset = queryset.filter(is_upcoming=is_upcoming)
        return queryset

class EventGalleryViewSet(viewsets.ModelViewSet):
    queryset = EventGallery.objects.all().order_by('-created_at')
    serializer_class = EventGallerySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all().order_by('order')
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class MembershipApplicationViewSet(viewsets.ModelViewSet):
    queryset = MembershipApplication.objects.all().order_by('-created_at')
    serializer_class = MembershipApplicationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscriber.objects.all().order_by('-subscribed_at')
    serializer_class = NewsletterSubscriberSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]
