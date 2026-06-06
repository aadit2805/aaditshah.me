"use client";

import React from 'react';
import projdata from '../../content/projects.json';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const ProjectShowcase = () => {
  const projects = projdata;

  const formatYear = (dateString) => dateString.split('-')[0];

  return (
    <div className="max-w-2xl mx-auto px-8 pb-24">
      <div className="space-y-4">
        {projects.map((project) => {
          const href = project.live || project.github || '#';
          return (
            <HoverCard key={project.id} openDelay={120} closeDelay={80}>
              <HoverCardTrigger asChild>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-2 border-b border-dashed border-landing-border hover:border-landing-muted transition-colors"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-sans font-medium text-landing-primary group-hover:text-landing-hover transition-colors shrink-0">
                      {project.title}
                    </span>
                    <span className="hidden sm:inline font-sans text-landing-muted text-sm truncate">
                      {project.tagline}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-landing-muted shrink-0 ml-4">
                    {formatYear(project.date)}
                  </span>
                </a>
              </HoverCardTrigger>

              <HoverCardContent align="start" className="w-80">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-sans font-semibold text-landing-primary">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-landing-muted shrink-0">
                    {formatYear(project.date)}
                  </span>
                </div>

                <p className="mt-1.5 font-sans text-sm text-landing-secondary leading-relaxed">
                  {project.description}
                </p>

                {project.technologies?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-landing-border bg-landing-muted/5 px-2 py-0.5 font-mono text-[11px] text-landing-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {(project.live || project.github) && (
                  <div className="mt-3 flex items-center gap-4 border-t border-dashed border-landing-border pt-2.5">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-landing-muted hover:text-landing-hover transition-colors"
                      >
                        live ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-landing-muted hover:text-landing-hover transition-colors"
                      >
                        github ↗
                      </a>
                    )}
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>

      {projects.length === 0 && (
        <p className="font-sans text-landing-muted">No projects yet.</p>
      )}
    </div>
  );
};

export default ProjectShowcase;
