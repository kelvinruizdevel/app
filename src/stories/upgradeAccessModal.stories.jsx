import React from 'react';

import UpgradeAccessModal from '../common/components/UpgradeAccessModal';

export default {
  title: 'Components/UpgradeAccessModal',
  component: UpgradeAccessModal,
  argTypes: {
    isOpen: {
      control: 'boolean'
    },
  },
};

const Component = (args) => <UpgradeAccessModal storySettings={{...args}} />;

export const Default = Component.bind({});
Default.args = {
  isOpen: true,
  finance: {
    "coding-introduction": "Coding introduction",
    "full-stack": "Full Stack",
    "software-engineering": "Software Engineering",
    "description": "Upgrade your membership to access all the benefits of the 4Geeks community",
    "button": {
      "title": "Upgrade plan",
      "link": "#upgrade-plan"
    },
    "plans" : [
      {
        "type": "pro",
        "show": true,
        "title": "One time payment",
        "price": "$199",
        "lastPrice": "<s>$399</s>",
        "offerTitle": "Limited offer",
        "payment": "One time payment",
        "description": "Full access to all features for the duration of the course",
        "bullets": {
          "title": "What you will get",
          "list": [
            {
              "title": "Unlimited access to group masterclasses"
            },
            {
              "title": "Unlimited access to workshops"
            },
            {
              "title": "Unlimited access to course content"
            },
            {
              "title": "Certificate endorsed by industry leaders"
            }
          ]
        }
      },
      {
        "type": "trial",
        "show": true,
        "title": "Free trial",
        "price": "Free trial",
        "payment": "Expires in 7 days",
        "lastPrice": "",
        "description": "No card needed. Full access to all features for 7 days",
        "bullets": {
          "title": "What you will get",
          "list": [
            {
              "title": "1 mentoring session per month."
            },
            {
              "title": "Limited access to workshops."
            },
            {
              "title": "Access to module 1 of the cohort."
            }
          ]
        }
      },
    
      {
        "type": "schoolarship-t1",
        "show": true,
        "title": "scholarship level 1",
        "price": "$70",
        "payment": "3 months",
        "highlightText": "",
        "description": "Full access to all features for the duration of the course.",
        "bullets": {
          "title": "What you will get",
          "list": [
            {
              "title": "scholarship level 1 - featured 1"
            },
            {
              "title": "scholarship level 1 - featured 2"
            },
            {
              "title": "scholarship level 1 - featured 3"
            },
            {
              "title": "scholarship level 1 - featured 4"
            }
          ]
        }
      },
      {
        "type": "schoolarship-t2",
        "show": true,
        "title": "scholarship level 2",
        "price": "$50",
        "payment": "5 months",
        "highlightText": "",
        "description": "Full access to all features for the duration of the course.",
        "bullets": {
          "title": "What you will get",
          "list": [
            {
              "title": "scholarship level 2 - featured 1"
            },
            {
              "title": "scholarship level 2 - featured 2"
            },
            {
              "title": "scholarship level 2 - featured 3"
            },
            {
              "title": "scholarship level 2 - featured 4"
            }
          ]
        }
      },
      {
        "type": "schoolarship-trial",
        "show": true,
        "title": "Free trial",
        "price": "7 days trial",
        "payment": "Expires in 7 days",
        "highlightText": "",
        "description": "No card needed. Full access to all features for 7 days",
        "bullets": {
          "title": "What you will get",
          "list": [
            {
              "title": "Free trial - featured 1"
            },
            {
              "title": "Free trial - featured 2"
            },
            {
              "title": "Free trial - featured 3"
            },
            {
              "title": "Free trial - featured 4"
            }
          ]
        }
      }
    ]
  },
};
