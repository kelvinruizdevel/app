import React from 'react';
import { addMinutes, addDays, subHours, addHours } from 'date-fns';
import ProgramCard from '../common/components/ProgramCard';

export default {
  title: 'Components/ProgramCard',
  component: ProgramCard,
  argTypes: {
    programName: {
      control: {
        type: 'string'
      }
    },
    programDescription: {
      control: {
        type: 'string'
      }
    },
    isBought: {
      control: {
        type: 'boolean'
      }
    },
    haveFreeTrial: {
      control: {
        type: 'boolean'
      }
    },
    startsIn: {
      control: {
        type: 'date'
      }
    },
    icon: {
      control: {
        type: 'string'
      }
    },
    syllabusContent: {
      control: {
        type: 'object'
      }
    },
    mentorsAvailable: {
      control: {
        type: 'object'
      }
    },
    isFreeTrial: {
      control: {
        type: 'boolean'
      }
    },
    freeTrialExpireDate: {
      control: {
        type: 'date'
      }
    },
    courseProgress: {
      control: {
        type: 'number'
      }
    },
    lessonNumber: {
      control: {
        type: 'number'
      }
    },
    lessonLink: {
      control: {
        type: 'string'
      }
    },
  }
};

const Component = (args, context) => {
  return <ProgramCard stTranslation={context.parameters.i18n.store.data} {...args} />
};

const mentors = [{
  isOnline: true,
  user: {
    first_name: 'Juan',
    last_name: 'López',
    profile: {
      avatar_url: '/static/images/p1.png',
    },
  },
},
{
  isOnline: true,
  user: {
    first_name: 'John',
    last_name: 'Doe',
    profile: {
      avatar_url: '/static/images/p2.png',
    },
  },
},
{
  isOnline: true,
  user: {
    first_name: 'Jane',
    last_name: 'Doe',
    profile: {
      avatar_url: '/static/images/p3.png',
    },
  },
},
{
  isOnline: true,
  user: {
    first_name: 'Juan',
    last_name: 'López',
    profile: {
      avatar_url: '/static/images/p1.png',
    },
  },
},
{
  isOnline: true,
  user: {
    first_name: 'John',
    last_name: 'Doe',
    profile: {
      avatar_url: '/static/images/p2.png',
    },
  },
},
{
  isOnline: true,
  user: {
    first_name: 'Jane',
    last_name: 'Doe',
    profile: {
      avatar_url: '/static/images/p3.png',
    },
  },
}];

export const Default = Component.bind({});
Default.args = {
  programName: 'Data Science',
  programDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  startsIn: new Date(addDays(new Date(), 3)),
  icon: 'data-science-bg',
  syllabusContent: {
    totalLessons: 30,
    totalProjects: 15,
    totalExercises: 15,
    completedLessons: 3,
    completedProjects: 10,
    completedExercises: 5,
  },
  mentorsAvailable: mentors,
  haveFreeTrial: true,
  isFreeTrial: false,
  isBought: false,
  freeTrialExpireDate: new Date(addDays(new Date(), 5)),
  lessonLink: 'https://www.google.com',
  lessonNumber: 1.2,
  courseProgress: 7,
};
