import { serloDomain } from '../../helper/serlo-domain'
import { InstanceData } from '@/data-types'

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'Subjects',
    icon: 'subject',
    children: [{ url: '/106103', title: 'Subjects under construction' }],
  },
  { url: '/23727', title: 'About Serlo', icon: 'about' },
  { url: '/27469', title: 'Get involved!', icon: 'participate' },
  {
    url: '',
    title: 'Community',
    icon: 'community',
    children: [
      {
        url: '/35587',
        title: 'Starting page for authors',
      },
      { url: 'https://community.serlo.org/', title: 'Chat for authors' },
      { url: '/entity/unrevised', title: 'Unrevised changes' },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'General',
      children: [
        { title: 'About Serlo', url: '/serlo' },
        { title: 'Get involved!', url: '/27469' },
        { title: 'Contact', url: '/41043' },
        {
          title: 'Serlo in other languages',
          url: `https://en.${serloDomain}/global`,
        },
        {
          title: 'Back into the old design',
          url: `https://de.${serloDomain}/disable-frontend`,
        },
        {
          title: 'API',
          url: `https://en.${serloDomain}/community/technology-and-development/content-api`,
        },
      ],
    },
    {
      title: 'Stay in touch',
      children: [
        {
          title: 'Newsletter',
          url:
            'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
          icon: 'newsletter',
        },
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: 'github',
        },
      ],
    },
    {
      title: 'Legal terms',
      children: [
        { title: 'Privacy Policy', url: `https://de.${serloDomain}/privacy` },
        {
          title: 'Terms of use',
          url: `https://de.${serloDomain}/terms`,
        },
        { title: 'Imprint', url: `https://de.${serloDomain}/imprint` },
      ],
    },
  ],
  aboutHref: '/serlo',
  participationHref: '/27469',
  donationHref: '/spenden',
}
