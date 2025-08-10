import { cn } from '../lib/utils';
import Base from '../layouts/Base';
import { FocusCards } from '../components/FocusCards';
import stripHtml from '../lib/strip-html';

export async function getStaticProps() {
  const meta = {
    title: 'Clicks // Gangadhar',
    tagline: 'clicks',
    primaryColor: 'violet',
    secondaryColor: 'purple',
  };

  return { props: meta };
}


function Clicks(props) {
  const { title, tagline } = props;
  const description = `A collection of moments captured through my lens. Each image tells a story, 
    freezing time in frames that speak louder than words.`;

  const cards = [
    {
      title: "Temple View",
      src: "/static/images/clicks/IMG_0433.webp",
    },
    {
      title: "Nature's Beauty",
      src: "/static/images/clicks/IMG_3778.webp",
    },
    {
      title: "City Skies",
      src: "/static/images/clicks/IMG_4147.webp",
    },
    {
      title: "Stone Pillars",
      src: "/static/images/clicks/IMG_5198_jpg.webp",
    },
    {
      title: "Zostel Pondi",
      src: "/static/images/clicks/IMG_6420.webp",
    },
    {
      title: "Ocean Sunrise",
      src: "/static/images/clicks/IMG_6565.webp",
    },
    {
      title: "Great Food",
      src: "/static/images/clicks/IMG_7692.webp",
    },
    {
      title: "Zostel Hampi",
      src: "/static/images/clicks/IMG_7991.webp",
    },
    {
      title: "Tipped Auto",
      src: "/static/images/clicks/instc 2024-12-15 132122.043.webp",
    },
  ];

  return (
    <>
      <p className={cn(
        "text-lg text-secondary leading-[1.7] mb-[60px]",
        "font-body max-w-[600px] text-center m-[0_auto_60px_auto]",
        "bp2:text-xl"
      )}>
        {description}
      </p>
      <div className={cn(
        "mt-10 mb-20"
      )}>
        <FocusCards cards={cards} />
      </div>
    </>
  );
}

Clicks.Layout = Base;

export default Clicks;