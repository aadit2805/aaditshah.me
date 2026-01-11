"use client";

import React, { useState } from 'react';
import projdata from '../app/portfolio/projdata.json';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ProjectShowcase = () => {
  const [projects] = useState(projdata);
  const [selectedProject, setSelectedProject] = useState(null);


  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="w-full">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                {projects.length} projects
              </Badge>
              <h1 className="text-4xl md:text-5xl font-mono font-bold text-zinc-100 mb-3">
                ~/portfolio
              </h1>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-700 transition-all"
              onClick={() => setSelectedProject(project)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-64 overflow-hidden bg-zinc-800">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-mono text-zinc-700">{project.title[0]}</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4 bg-zinc-900">
                <h3 className="font-mono text-xl font-bold text-zinc-100 leading-tight group-hover:text-emerald-400 transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-emerald-400/70 font-mono text-xs mb-3">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-zinc-800 text-zinc-500 border-zinc-700 font-mono text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="bg-zinc-800 text-zinc-600 border-zinc-700 font-mono text-xs"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-emerald-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      [source]
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-emerald-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      [live]
                    </a>
                  )}
                  <span className="text-zinc-600 ml-auto">{formatDate(project.date)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="font-mono text-zinc-500">
              <p className="text-emerald-400 mb-2">$ ls projects/</p>
              <p>No projects found.</p>
            </div>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-700 max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          {selectedProject && (
            <div>
              <div className="relative aspect-[2/1] overflow-hidden bg-zinc-800">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-7xl font-mono text-zinc-700">{selectedProject.title[0]}</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-mono font-bold text-zinc-100">
                    {selectedProject.title}
                  </DialogTitle>
                  <p className="text-emerald-400/80 font-mono text-sm mt-1">
                    {selectedProject.tagline}
                  </p>
                </DialogHeader>

                <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                  {selectedProject.description}
                </p>

                {/* Highlights */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-3">
                      Key Features
                    </p>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-400 font-mono text-sm">
                          <span className="text-emerald-400 mt-0.5">-</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-400 border-zinc-700 font-mono text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-mono text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      View Source
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors font-mono text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  <span className="text-zinc-600 font-mono text-sm ml-auto">
                    {formatDate(selectedProject.date)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectShowcase;
