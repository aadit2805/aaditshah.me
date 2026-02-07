"use client";

import React from 'react';
import projdata from '../app/portfolio/projdata.json';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ProjectShowcase = () => {
  const projects = projdata;

  const formatYear = (dateString) => {
    return dateString.split('-')[0];
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="max-w-2xl mx-auto px-8 pb-24">
        <div className="space-y-4">
          {projects.map((project) => (
            <Tooltip key={project.id}>
              <TooltipTrigger asChild>
                <a
                  href={project.live || project.github || '#'}
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
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-sm">
                {project.description}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="font-sans text-landing-muted">No projects yet.</p>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ProjectShowcase;
