export type Project = {
  data: {
    title: string;
    description: string;
    images: {
      src: string;
      alt: string;
      description: string;
    }[];
    skills: string[];
    github: string;
    liveLink: string;
    features: string[];
    challenges: string[];
    learnings: string[];
    stats: {
      label: string;
      value: string;
      icon: {
        name: string;
        styling?: string;
      };
    }[];
    timeline: {
      title: string;
      date: string;
      description: string;
    }[];
    testimonial: {
      quote: string;
      author: {
        name: string;
        role: string;
        avatar: string;
      };
    };
    insights: {
      title: string;
      content: string;
      icon: {
        name: string;
        styling?: string;
      };
    }[];
    overview: string;
    process: string;
  };
  slug: string;
};
