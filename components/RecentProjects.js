import projectsData from "@/data/projectsData";

import ProjectCard from "@/components/ProjectCard";
import AnimatedDiv from "@/components/framer-motion/AnimatedDiv";
import { FadeContainer } from "../lib/FramerMotionVariants";
import Link from "@/components/Link";

const RecentProjects = ({ MAX_PROJECTS, recentProjects }) => {
  const projectsList = recentProjects.map((project) => {
    const imgUrl = `https:${project?.image?.fields?.file?.url}`;
    const title = project?.text?.content[0]?.content[0]?.value;
    const text = project?.text?.content[1]?.content[0]?.value;
    const tools = Object.keys(project?.tools) || [];
    return { imgUrl, title, text, tools };
  });

  return (
    <>
      <div className="divide-y divide-gray-700">
        <div className="my-4">
          <span className="font-poppins title-font text-3xl font-bold">
            Recent Projects
          </span>
        </div>
        <div className="py-5">
          <AnimatedDiv
            variants={FadeContainer}
            className="mx-auto grid grid-cols-1 gap-4 md:ml-[20%] xl:ml-[24%]"
          >
            {projectsList.map((d) => (
              <ProjectCard
                key={d.title}
                title={d.title}
                description={d.text}
                imgSrc={d.imgUrl}
                tools={d.tools}
              />
            ))}
          </AnimatedDiv>
        </div>
        <div className="mt-5 flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="mt-5 hover:text-primary-400"
            aria-label="all posts"
          >
            All Projects &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecentProjects;
