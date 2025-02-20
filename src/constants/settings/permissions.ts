export const initialPermissions = [
    {
        resource: 'bot Builder',
        access: { "full access": false }
    },
    {
        resource: 'AI Studio',
        access: { "full access": false }
    },
    {
        resource: 'live Chat',
        access: {
            "full access": false,
            manageHumanHandover: false,
            manageGeneralSettings: false
        }
    },
    {
        resource: 'Tickets',
        access: { "full access": false }
    },
    {
        resource: 'Analytics',
        access: { "full access": false }
    },
    {
        resource: 'App market',
        access: { "full access": false }
    },
    {
        resource: 'Channel configuration',
        access: { "full access": false }
    },
    {
        resource: 'Contacts',
        access: { "full access": false }
    },
    {
        resource: 'Account settings',
        access: {
            "Can manage teammates, roles, and permissions": false,
            "Can manage teams": false,
            "Can manage variables": false,
            "Can setup and manage events": false,
            "Can manage general settings": false,
            "Can setup and manage link tracking": false
        }
    }
]
