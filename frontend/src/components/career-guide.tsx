'use client'
import { CareerGuideResponse } from '@/type';
import axios from 'axios';
import { ArrowRight, BookOpen, Briefcase, Lightbulb, Loader2, Sparkles, Target, TrendingUp, X } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import toast from 'react-hot-toast';

const CareerGuide = () => {
  const [open, setOpen] = useState(false); // dialogue box open or close
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse | null>(null);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const getCarrerGuidance = async () => {
    if (skills.length === 0) {
      toast.error("Please add at least on skill");
      // alert("Please add at least on skill");
      return;
    }
    setLoading(true);
    try {
      // const { data } = await axios.post(`${utils_service}/api/utils/career`, {
      //   skills: skills,
      // });

      const data = {
        "summary": "You possess a powerful Modern Full Stack profile with a significant advantage in backend architecture. Your combination of React for UI, Node.js for logic, and versatility in both NoSQL (MongoDB) and Serverless SQL (NeonDB) positions you perfectly for high-demand roles. Specifically, your familiarity with microservice architecture indicates you are ready to move beyond simple apps to complex, scalable systems.",
        "jobOptions": [
          {
            "title": "Senior Full Stack Engineer",
            "responsibilities": "Design and build end-to-end features, manage database schemas across SQL and NoSQL systems, and architect frontend-backend integration.",
            "why": "You have the complete toolkit to own features from the UI down to the database layer."
          },
          {
            "title": "Backend Software Engineer (Node.js Focus)",
            "responsibilities": "Develop scalable APIs, optimize database queries for performance, and refactor monolithic codebases into microservices.",
            "why": "Your specific knowledge of microservices and diverse database experience makes you highly valuable for teams focusing on server-side scalability."
          },
          {
            "title": "Cloud Application Architect",
            "responsibilities": "Make high-level design choices, select technical standards, and design the interaction between different microservices and databases.",
            "why": "Your understanding of architectural patterns (microservices) and cloud-native databases (NeonDB) aligns well with architectural roles."
          }
        ],
        "skillsToLearn": [
          {
            "category": "DevOps & Containerization (Critical for Microservices)",
            "skills": [
              {
                "title": "Docker & Kubernetes",
                "why": "Microservices require containerization to be deployed and managed consistently across environments.",
                "how": "Create a Dockerfile for your Node.js app and orchestrate two communicating services using Docker Compose."
              },
              {
                "title": "CI/CD Pipelines (GitHub Actions)",
                "why": "Automating testing and deployment is mandatory in a microservice architecture to prevent regression.",
                "how": "Set up a pipeline that automatically runs tests and deploys to a staging environment upon a git push."
              }
            ]
          },
          {
            "category": "Inter-Service Communication",
            "skills": [
              {
                "title": "Message Queues (RabbitMQ / Kafka) or gRPC",
                "why": "Microservices often need asynchronous communication or high-performance RPC calls rather than just REST.",
                "how": "Build a small system where Service A publishes an event to a queue and Service B consumes it."
              },
              {
                "title": "TypeScript",
                "why": "Strict typing is essential for maintaining code quality and reducing runtime errors in large distributed systems.",
                "how": "Refactor one of your existing Node.js microservices to use TypeScript."
              }
            ]
          }
        ],
        "learningApproach": {
          "title": "System Design Focused",
          "points": [
            "Shift focus from 'coding features' to 'designing systems'; practice drawing architecture diagrams before writing code.",
            "Build a project that forces a separation of concerns, such as an Auth Service that is completely separate from a User Data Service.",
            "Deepen your SQL knowledge with NeonDB by learning about indexing and complex joins, comparing performance against your MongoDB aggregations."
          ]
        }
      }


      setResponse(data);
      toast.success("Carrer guidence generated");
      // alert("Carrer guidence generated");
    } catch (error: any) {
      toast.error(error.response.data.message);
      // alert(error.response.data.message);

    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkills([]);
    setCurrentSkill("");
    setResponse(null);
    setOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-blue-50 dark:bg-blue-950 mb-4">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-sm font-medium">
            AI-Powered Carrer Guidence
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Discover Your Carrer Path
        </h2>
        <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8">
          Get personalized job recomendations and learnings roadmaps based on
          your skills.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size={"lg"} className="gap-2 h-12 px-8">
              <Sparkles size={18} />
              Get Carrer Guidence
              <ArrowRight size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {
              !response? (<>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="text-blue-600" />
                    Tell us about your skills
                  </DialogTitle>
                  <DialogDescription>
                    Add your technical skills to recieve personalized carrer
                    recomendations
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="skill">Add Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skill"
                        placeholder="e.g., React, Node.js, Python..."
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        className="h-11"
                        onKeyDown={handleKeyPress}
                      />
                      <Button onClick={addSkill} className="gap-2">
                        Add
                      </Button>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div className="space-y-2">
                      <Label>Your Skills ({skills.length})</Label>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <div
                            key={s}
                            className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                          >
                            <span className="text-sm font-medium">{s}</span>
                            <button
                              onClick={() => removeSkill(s)}
                              className="h-5 w-5 rounded-full bg-red-500 text-white flex in-checked: justify-center"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={getCarrerGuidance}
                    disabled={loading || skills.length === 0}
                    className="w-full h-11 gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Analyzing
                        Your skills...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Generate Carrer Guidence
                      </>
                    )}
                  </Button>

                </div>

              </> ) 
              : 
              (<>
                  <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Target className="text-blue-600" />
                    Your Personlized Carrer Guide
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4 ">
                   {/* summary */}
                   <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-b-blue-200 dark:border-b-blue-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb
                        className="text-blue-600 mt-1 shrink-0"
                        size={20}
                      />
                      <div>
                        <h3 className="font-semibold mb-2">Career Summary</h3>
                        <p className="text-sm leading-relaxed opacity-90">
                          {response.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* job options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Briefcase size={20} className="text-blue-600" />
                      Recomended Carrer Paths
                    </h3>
                    <div className="space-y-3">
                      {response.jobOptions.map((job, index) => (
                        <div
                          className="p-4 rounded-lg border hover:border-blue-500 transition-colors"
                          key={index}
                        >
                          <h4 className="font-semibold text-base mb-2">
                            {job.title}
                          </h4>

                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium opacity-70">
                                Responsibilities:
                              </span>
                              <span className="opacity-80">
                                {job.responsibilities}
                              </span>
                            </div>
                            <span className="font-medium opacity-70">
                              Why this Role:
                            </span>
                            <span className="opacity-80">{job.why}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills to learn */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp size={20} className="text-blue-600" />
                      Skills to Enhance Your Carrer
                    </h3>
                    <div className="space-y-4">
                      {response.skillsToLearn.map((category, index) => (
                        <div className="space-y-2" key={index}>
                          <h4 className="font-semibold text-sm text-blue-600">
                            {category.category}
                          </h4>
                          <div className="space-y-2">
                            {category.skills.map((skill, sindex) => (
                              <div
                                key={sindex}
                                className="p-3 rounded-lg bg-secondary border text-sm"
                              >
                                <p className="font-medium mb-1">
                                  {skill.title}
                                </p>

                                <p className="text-xs opacity-70 mb-1">
                                  <span className="font-medium">Why: </span>
                                  {skill.why}
                                </p>

                                <p className="text-xs opacity-70 mb-1">
                                  <span className="font-medium">How: </span>
                                  {skill.how}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning approach */}
                  <div className="p-4 rounded-lg border bg-blue-950/20 dark:bg-red-950/20 ">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <BookOpen size={20} className="text-blue-600" />
                      {response?.learningApproach?.title}
                    </h3>

                    <ul className="space-y-2">
                      {response?.learningApproach?.points?.map(
                        (point, index) => (
                          <li
                            key={index}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-blue-600 mt-0.5">•</span>
                            <span
                              className="opacity-90"
                              dangerouslySetInnerHTML={{ __html: point }}
                            />
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <Button
                    onClick={resetDialog}
                    variant={"outline"}
                    className="w-full"
                  >
                    Start New Analysis
                  </Button>
                  
                </div>
              </> )
            }

          </DialogContent>

        </Dialog>

      </div>
    </div>
  )
}

export default CareerGuide