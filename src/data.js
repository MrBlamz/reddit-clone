import { formatDistance, subDays } from 'date-fns';

export const postExample = {
  title: 'Staying Grounded in Times of Trouble',
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis quam optio maxime beatae? Minus adipisci laudantium dolorum excepturi amet magni doloremque, accusamus architecto quae dolore ullam sed deleniti officia eligendi ratione sapiente quos accusantium molestiae voluptatum magnam obcaecati asperiores suscipit praesentium eveniet. Distinctio minus fugit nulla beatae nesciunt earum nihil!',
  author: 'MrBlamz',
  timestamp: formatDistance(subDays(new Date(), 1), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  }),
  comments: [
    {
      author: '',
      content: '',
    },
  ],
  upVotes: 2,
  downVotes: 0,
};

export const dbExample = {
  communities: [
    {
      communityName: '',
      posts: [
        {
          title: '',
          content: '',
          author: '',
          timestamp: '',
          comments: [],
          upVotes: 0,
          downVotes: 0,
        },
      ],
    },
  ],
};
