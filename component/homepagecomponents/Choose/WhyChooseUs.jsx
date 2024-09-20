// import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
};

const Skeleton = ({ src }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <Image
      src={src}
      alt="services"
      width={3000}
      height={2163}
      className="object-cover flex-1"
    />
  </div>
);
const items = [
  {
    title: "User-Friendly",
    description:
      "Our platform is designed with a focus on usability, ensuring a smooth and intuitive experience for all users.",
    header: <Skeleton src={"/assets/images/userfriendly.jpg"} />,
  },
  {
    title: "Award-Winning Platform",
    description:
      "Recognized globally for excellence, our platform has won numerous awards for innovation and performance.",
    header: <Skeleton src={"/assets/images/awardwinning.jpg"} />,
  },
  {
    title: "Privacy",
    description:
      "We prioritize your privacy, employing the latest technologies to protect your personal and financial information.",
    header: <Skeleton src={"/assets/images/privacy.jpg"} />,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions or concerns.",
    header: <Skeleton src={"/assets/images/supportteam.jpg"} />,
  },
  {
    title: "Fast and Easy Withdrawal",
    description:
      "Enjoy quick and hassle-free withdrawals with our streamlined processes, getting you your funds when you need them.",
    header: <Skeleton src={"/assets/images/cashout.jpg"} />,
  },
];
export default WhyChooseUs;
