/* eslint-disable prettier/prettier */
import {
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiRedux,
  SiFirebase,
  SiGit,
  SiPhp,
  SiVuedotjs,
  SiLaravel,
  SiNginx,
  SiMysql,
} from "react-icons/si";

import { motion } from "framer-motion";
import {
  showHoverAnimation,
  removeHoverAnimation,
} from "../lib/windowAnimation";
import { FadeContainer, popUp } from "../lib/FramerMotionVariants";
import Image from "next/image";
const skills = [
  {
    name: "PHP",
    logo: SiPhp,
  },
  {
    name: "Vue",
    logo: SiVuedotjs,
  },
  {
    name: "Laravel",
    logo: SiLaravel,
  },
  {
    name: "Nginx",
    logo: SiNginx,
  },
  {
    name: "mySQL",
    logo: SiMysql,
  },
  {
    name: "TypeScript",
    logo: SiTypescript,
  },
  {
    name: "HTML",
    logo: SiHtml5,
  },
  {
    name: "CSS",
    logo: SiCss3,
  },
  {
    name: "JavaScript",
    logo: SiJavascript,
  },
  {
    name: "React",
    logo: SiReact,
  },
  {
    name: "Tailwind CSS",
    logo: SiTailwindcss,
  },
  {
    name: "Nextjs",
    logo: SiNextdotjs,
  },
  // {
  //   name: 'Node.js',
  //   logo: SiNodedotjs,
  // },
  // {
  //   name: 'PostgreSQL',
  //   logo: SiPostgresql,
  // },
  // {
  //   name: 'Redux',
  //   logo: SiRedux,
  // },

  // {
  //   name: 'Firebase',
  //   logo: SiFirebase,
  // },
  // {
  //   name: 'Git',
  //   logo: SiGit,
  // },
];

const Skills = ({ topSkill }) => {
  const skills = Object.keys(topSkill[0].skills).map((skill) => ({
    name: skill,
    logo: topSkill[0].skills[skill],
  }));
  return (
    <>
      <span className="font-poppins title-font text-3xl font-bold">
        My Top Skills
      </span>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="my-10 grid grid-cols-3 gap-4"
      >
        {skills.map((skill) => (
          <motion.div
            title={skill.name}
            variants={popUp}
            key={skill.name}
            onMouseMove={(e) => showHoverAnimation(e)}
            onMouseLeave={(e) => removeHoverAnimation(e)}
            className="dark:bg-darkPrimary group flex origin-center transform items-center justify-center gap-4 rounded-sm border border-gray-300 p-4 dark:border-neutral-700 hover:dark:bg-darkSecondary sm:justify-start md:origin-top"
          >
            <div className="pointer-events-none relative select-none transition group-hover:scale-110 sm:group-hover:scale-100">
              {/* <skill.logo className="h-8 w-8" /> */}
              <Image src={skill.logo} alt={skill.name} width={32} height={32} />
            </div>
            <p className="pointer-events-none hidden select-none text-sm font-semibold sm:inline-flex md:text-base">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Skills;
