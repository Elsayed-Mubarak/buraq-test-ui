type LinkTypes = {
    label: string;
    link: string;
    subLink?: LinkTypes[]
};

export const ChannelLinks: LinkTypes[] = [
    {
        label: "Web",
        link: "",
        subLink: [
            {
                label: 'Appearance',
                link: '/dashboard/channel/web/appearance',
            },
            {
                label: 'General Settings',
                link: '/dashboard/channel/web/general-settings',
            },
            {
                label: 'Popup Messages',
                link: '/dashboard/channel/web/popup-messages',
            },
            {
                label: 'Trigger Conditions',
                link: '/dashboard/channel/web/bot-triggers',
            },
            {
                label: 'Configuration',
                link: '/dashboard/channel/web/configuration',
            },
        ]
    },
    // {
    //     label: 'Facebook',
    //     link: '/dashboard/channel/facebook'
    // },
    {
        label: 'Whatsapp',
        link: '',
        subLink: [
            {
                label: 'Template Messages',
                link: '/dashboard/channel/whatsapp/templates'
            },
            {
                label: 'Configuration',
                link: '/dashboard/channel/whatsapp'
            },
        ]
    },
    {
        label: 'Instagram',
        link: '/dashboard/channel/instagram'
    },
    // {
    //     label: 'Email',
    //     link: '',
    //     subLink: [
    //         {
    //             label: 'Templates',
    //             link: '/dashboard/channel/email/templates'
    //         },
    //         {
    //             label: 'Configuration',
    //             link: '/dashboard/channel/email'
    //         },
    //     ]
    // },
    // {
    //     label: 'SMS',
    //     link: '/dashboard/channel/sms'
    // }
]