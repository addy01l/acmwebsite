from django.contrib import admin
from .models import (
    Member, Event, EventGallery, Domain, TeamMember, 
    ContactMessage, MembershipApplication, NewsletterSubscriber, EventRegistration
)

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'enrollment_no', 'email', 'domain', 'role')
    search_fields = ('name', 'enrollment_no', 'email')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'category', 'is_upcoming')
    list_filter = ('is_upcoming', 'category')
    search_fields = ('title', 'venue')

@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('applicant_name', 'event', 'applicant_email', 'payment_status', 'created_at')
    list_filter = ('payment_status', 'event')
    search_fields = ('applicant_name', 'applicant_email')

admin.site.register(EventGallery)
admin.site.register(Domain)
admin.site.register(TeamMember)
admin.site.register(ContactMessage)
admin.site.register(MembershipApplication)
admin.site.register(NewsletterSubscriber)
